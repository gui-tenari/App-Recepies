import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import ShareButton from '../../components/ShareButton';
import FavoriteButton from '../../components/FavoriteButton';

import {
  addRecipeIngredient,
  removeRecipeIngredient,
} from '../../redux/actions/inProgressRecipesActions';

import { setDoneRecipe } from '../../redux/actions/doneRecipesActions';

import getIngredients from '../../utils/getIngredients';

import './style.css';

function MealProgress() {
  const [meal, setMeal] = useState({});
  const [ingredients, setIngredients] = useState([]);

  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  const progressInfo = useSelector(
    ({ inProgressRecipes }) => inProgressRecipes.meals[id] || [],
  );

  useEffect(() => {
    async function getMeal() {
      const promiseMeals = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
      );
      const fetchedMeal = await promiseMeals.json();
      setMeal(fetchedMeal.meals[0]);
    }

    getMeal();
  }, [id]);

  useEffect(() => {
    setIngredients(getIngredients(meal));
  }, [meal]);

  function handleChange(ingredient, isChecked) {
    if (!isChecked) {
      dispatch(addRecipeIngredient(id, 'comida', ingredient));
    } else {
      dispatch(removeRecipeIngredient(id, 'comida', ingredient));
    }
  }

  function handleClickComidas() {
    dispatch(setDoneRecipe(meal, 'Meal'));
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
      <ShareButton type="comidas" id={ id } testId="share-btn" />
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

export default MealProgress;
