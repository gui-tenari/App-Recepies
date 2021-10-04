import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import Loading from '../../components/Loading';
import ShareButton from '../../components/ShareButton';
import FavoriteButton from '../../components/FavoriteButton';

import getIngredients from '../../utils/getIngredients';

import './style.css';

const MAX_RECOMENDATIONS = 6;

const DrinkDetails = () => {
  const [drink, setDrink] = useState({});
  const [meals, setMeals] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  const history = useHistory();
  const { id } = useParams();

  const isDone = useSelector(({ doneRecipes }) => doneRecipes
    .some((recipe) => recipe.id === id));
  const isInProgress = useSelector(
    ({ inProgressRecipes }) => !!inProgressRecipes.cocktails[id],
  );

  useEffect(() => {
    async function getDrink() {
      const promiseDrinks = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`,
      );
      const { drinks } = await promiseDrinks.json();
      const fetchedDrink = drinks[0];

      setDrink(fetchedDrink);
    }
    getDrink();
  }, [id]);

  useEffect(() => {
    async function getMeals() {
      const promiseMeals = await fetch(
        'https://www.themealdb.com/api/json/v1/1/search.php?s=',
      );
      const fetchedMeals = await promiseMeals.json();
      setMeals([...fetchedMeals.meals]);
    }

    getMeals();
  }, []);

  useEffect(() => {
    setIngredients(getIngredients(drink));
  }, [drink]);

  function startRecipe() {
    history.push(`/bebidas/${id}/in-progress`);
  }

  if (!drink.strDrink) {
    return <Loading />;
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
      {ingredients.map(({ ingredient, measure }, index) => (
        <div key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
          <p>
            {ingredient}
            {measure && <span>{` - ${measure}`}</span>}
          </p>
        </div>
      ))}
      <p data-testid="instructions">{drink.strInstructions}</p>
      <div className="carousel">
        {meals.slice(0, MAX_RECOMENDATIONS).map((meal, index) => (
          <div
            className="recommendation-card"
            data-testid={ `${index}-recomendation-card` }
            key={ meal.strMeal }
          >
            <span data-testid={ `${index}-recomendation-title` }>
              {meal.strMeal}
            </span>
            <img src={ meal.strMealThumb } alt={ meal.strMeal } />
          </div>
        ))}
      </div>
      {!isDone && (
        <button
          onClick={ startRecipe }
          className="start-recipe"
          type="button"
          data-testid="start-recipe-btn"
        >
          {isInProgress ? 'Continuar Receita' : 'Iniciar Receita'}
        </button>
      )}
    </div>
  );
};

export default DrinkDetails;
