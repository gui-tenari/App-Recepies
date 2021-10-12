import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import ShareButton from '../../components/ShareButton';
import FavoriteButton from '../../components/FavoriteButton';
import BackButton from '../../components/BackButton';
import Button from '../../components/Button';

import {
  addRecipeIngredient,
  removeRecipeIngredient,
} from '../../redux/actions/inProgressRecipesActions';

import { setDoneRecipe } from '../../redux/actions/doneRecipesActions';

import getIngredients from '../../utils/getIngredients';
import IngredientCheckbox from '../../components/IngredientCheckbox';

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
    <div className="recipe-details recipe-progress">
      <BackButton />
      <img
        className="recipe-image"
        data-testid="recipe-photo"
        src={ drink.strDrinkThumb }
        alt={ drink.strDrink }
      />

      <div className="recipe-info">
        <div className="info-header">
          <div className="name-section">
            <h1 data-testid="recipe-title">{drink.strDrink}</h1>
            <p data-testid="recipe-category">{drink.strAlcoholic}</p>
          </div>
          <div className="icons-section">
            <ShareButton type="bebidas" id={ id } testId="share-btn" />
            <FavoriteButton
              recipe={ drink }
              type="bebida"
              testId="favorite-btn"
            />
          </div>
        </div>

        <div className="section-name">Ingredients</div>

        <div className="ingredients-section">
          {ingredients.map(({ ingredient, measure }, index) => {
            const ingredientKey = `${ingredient} - ${measure}`;
            const isChecked = progressInfo.includes(ingredientKey);

            return (
              <IngredientCheckbox
                name="progress"
                key={ ingredientKey }
                text={ ingredientKey }
                isChecked={ isChecked }
                onChange={ () => handleChange(ingredientKey, isChecked) }
                index={ index }
                testId="ingredient-step"
              />
            );
          })}
        </div>

        <div className="section-name">Instructions</div>
        <p className="instructions" data-testid="instructions">
          {drink.strInstructions}
        </p>

        <Button
          disabled={ progressInfo.length !== ingredients.length }
          text="Finalizar Receita"
          onClick={ () => handleClickBebidas() }
          testId="finish-recipe-btn"
        />
      </div>
    </div>
  );
}

export default DrinkProgress;
