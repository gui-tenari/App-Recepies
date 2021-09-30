import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import ShareButton from '../../components/ShareButton';
import FavoriteButton from '../../components/FavoriteButton';

import {
  getInProgressRecipes,
  setInProgressRecipes,
} from '../../utils/localStorageHelpers';

import getIngredients from '../../utils/getIngredients';

import './style.css';

function MealProgress(props) {
  const {
    match: {
      params: { id },
    },
  } = props;

  const [meal, setMeal] = useState({});
  const [progressInfo, setProgressInfo] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  const history = useHistory();

  useEffect(() => {
    async function getMeal() {
      const promiseMeals = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
      );
      const fetchedMeal = await promiseMeals.json();
      setMeal(fetchedMeal.meals[0]);
    }

    function getRecipeStatus() {
      const inProgressRecipes = getInProgressRecipes();
      const { meals } = inProgressRecipes;

      setProgressInfo(meals[id] || []);
    }

    getMeal();
    getRecipeStatus();
  }, [id]);

  useEffect(() => {
    if (id) {
      setInProgressRecipes(progressInfo, 'meals', id);
    }
  }, [id, progressInfo]);

  useEffect(() => {
    setIngredients(getIngredients(meal));
  }, [meal]);

  function handleChange(ingredient, isChecked) {
    if (!isChecked) {
      setProgressInfo([...progressInfo, ingredient]);
    } else {
      setProgressInfo(progressInfo.filter((name) => ingredient !== name));
    }
  }

  function handleClickComidas() {
    history.push('/receitas-feitas');
  }

  return (
    <div>
      <img
        data-testid="recipe-photo"
        src={ meal.strMealThumb }
        alt={ meal.strMeal }
      />
      <h1 data-testid="recipe-title">{meal.strMeal}</h1>
      <ShareButton type="comidas" id={ meal.idMeal } testId="share-btn" />
      <FavoriteButton recipe={ meal } type="comida" testId="favorite-btn" />
      <p data-testid="recipe-category">{meal.strCategory}</p>
      {ingredients.map(({ ingredient }, index) => {
        const isChecked = progressInfo.includes(ingredient);
        return (
          <label
            key={ ingredient }
            data-testid={ `${index}-ingredient-step` }
            htmlFor={ `${index}-ingredient` }
            className={ isChecked ? 'finished' : '' }
          >
            <input
              type="checkbox"
              id={ `${index}-ingredient` }
              name="progress"
              checked={ isChecked }
              onChange={ () => handleChange(ingredient, isChecked) }
            />
            {ingredient}
          </label>
        );
      })}
      <p data-testid="instructions">{meal.strInstructions}</p>
      <button
        onClick={ handleClickComidas }
        className="start-recipe"
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ progressInfo.length !== ingredients.length }
      >
        Finalizar Receita
      </button>
    </div>
  );
}

MealProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default MealProgress;
