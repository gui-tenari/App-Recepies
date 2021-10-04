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

function DrinkProgress() {
  const [drink, setDrink] = useState({});
  const [ingredients, setIngredients] = useState([]);

  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  const progressInfo = useSelector(
    ({ inProgressRecipes }) => inProgressRecipes.cocktails[id] || [],
  );

  useEffect(() => {
    async function getDrinks() {
      const promiseDrinks = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`,
      );
      const fetchedDrinks = await promiseDrinks.json();
      setDrink(fetchedDrinks.drinks[0]);
    }

    getDrinks();
  }, [id]);

  useEffect(() => {
    setIngredients(getIngredients(drink));
  }, [drink]);

  function handleChange(ingredient, isChecked) {
    if (!isChecked) {
      dispatch(addRecipeIngredient(id, 'bebida', ingredient));
    } else {
      dispatch(removeRecipeIngredient(id, 'bebida', ingredient));
    }
  }

  function handleClickBebidas() {
    dispatch(setDoneRecipe(drink, 'Drink'));
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
      <ShareButton type="bebidas" id={ id } testId="share-btn" />
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

export default DrinkProgress;
