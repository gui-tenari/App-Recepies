import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import ShareButton from '../../components/ShareButton';
import FavoriteButton from '../../components/FavoriteButton';
import IngredientCheckbox from '../../components/IngredientCheckbox';
import BackButton from '../../components/BackButton';
import Button from '../../components/Button';

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
    <div className="recipe-details recipe-progress">
      <BackButton />
      <img
        className="recipe-image"
        data-testid="recipe-photo"
        src={ meal.strMealThumb }
        alt={ meal.strMeal }
      />
      <div className="recipe-info">
        <div className="info-header">
          <div className="name-section">
            <h1 data-testid="recipe-title">{meal.strMeal}</h1>
            <p data-testid="recipe-category">{meal.strCategory}</p>
          </div>
          <div className="icons-section">
            <ShareButton type="comidas" id={ id } testId="share-btn" />
            <FavoriteButton recipe={ meal } type="comida" testId="favorite-btn" />
          </div>
        </div>

        <p className="section-name">Ingredients</p>

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
              />
            );
          })}
        </div>

        <p className="section-name">Instructions</p>
        <p className="instructions" data-testid="instructions">
          {meal.strInstructions}
        </p>

        <Button
          disabled={ progressInfo.length !== ingredients.length }
          text="Finalizar Receita"
          onClick={ () => handleClickComidas() }
          testId="finish-recipe-btn"
        />
      </div>
    </div>
  );
}

export default MealProgress;
