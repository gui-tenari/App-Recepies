import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import ShareButton from '../../components/ShareButton';
import FavoriteButton from '../../components/FavoriteButton';

import {
  getFinishedRecipe,
  getInProgressRecipes,
  setInProgressRecipes,
} from '../../utils/localStorageHelpers';

import getIngredients from '../../utils/getIngredients';

function DrinkProgress(props) {
  const {
    match: {
      params: { id },
    },
  } = props;

  const [drink, setDrink] = useState({});
  const [progressInfo, setProgressInfo] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  const history = useHistory();

  useEffect(() => {
    async function getDrinks() {
      const promiseDrinks = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`,
      );
      const fetchedDrinks = await promiseDrinks.json();
      setDrink(fetchedDrinks.drinks[0]);
    }

    function getRecipeStatus() {
      const inProgressRecipes = getInProgressRecipes();
      const { cocktails } = inProgressRecipes;

      setProgressInfo(cocktails[id] || []);
    }

    getDrinks();
    getRecipeStatus();
  }, [id]);

  useEffect(() => {
    if (id) {
      setInProgressRecipes(progressInfo, 'cocktails', id);
    }
  }, [id, progressInfo]);

  useEffect(() => {
    setIngredients(getIngredients(drink));
  }, [drink]);

  function handleChange(ingredient, isChecked) {
    if (!isChecked) {
      setProgressInfo([...progressInfo, ingredient]);
    } else {
      setProgressInfo(progressInfo.filter((name) => ingredient !== name));
    }
  }

  function handleClickBebidas() {
    getFinishedRecipe(drink, 'Drink');
    history.push('/receitas-feitas');
  }

  return (
    <div>
      <img
        data-testid="recipe-photo"
        src={ drink.strDrinkThumb }
        alt={ drink.strDrink }
      />
      <h1 data-testid="recipe-title">{drink.strDrink}</h1>
      <ShareButton type="bebidas" id={ drink.idDrink } testId="share-btn" />
      <FavoriteButton recipe={ drink } type="bebida" testId="favorite-btn" />
      <p data-testid="recipe-category">{drink.strAlcoholic}</p>
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
      <p data-testid="instructions">{drink.strInstructions}</p>
      <button
        onClick={ handleClickBebidas }
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
DrinkProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default DrinkProgress;
