import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './style.css';

const MAX_RECOMENDATIONS = 6;
const MAX_NUMBER = 20;

const MealDetails = (props) => {
  const {
    match: {
      params: { id },
    },
  } = props;
  const [meal, setMeal] = useState({});
  const [drinks, setDrinks] = useState([]);

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
    async function getDrinks() {
      const promiseDrinks = await fetch(
        'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
      );
      const fetchedDrinks = await promiseDrinks.json();
      setDrinks([...fetchedDrinks.drinks]);
    }
    getDrinks();
  }, []);

  const ingredients = [];
  for (let i = 1; i <= MAX_NUMBER; i += 1) {
    if (meal[`strIngredient${i}`] !== '') {
      ingredients.push(meal[`strIngredient${i}`]);
    }
  }
  const measures = [];
  for (let i = 1; i <= MAX_NUMBER; i += 1) {
    if (meal[`strMeasure${i}`] !== '') {
      measures.push(meal[`strMeasure${i}`]);
    }
  }

  return (
    <div>
      <img
        data-testid="recipe-photo"
        src={ meal.strMealThumb }
        alt={ meal.strMeal }
      />
      <h1 data-testid="recipe-title">{meal.strMeal}</h1>
      <button type="button" data-testid="share-btn">
        Compartilhar
      </button>
      <button type="button" data-testid="favorite-btn">
        Favoritar
      </button>
      <p data-testid="recipe-category">{meal.strCategory}</p>
      {ingredients.map((ingredient, index) => (
        <div
          key={ ingredient }
          data-testid={ `${index}-ingredient-name-and-measure` }
        >
          {ingredient}
        </div>
      ))}
      {measures.map((measure, index) => (
        <div
          key={ measure }
          data-testid={ `${index}-ingredient-name-and-measure` }
        >
          {measure}
        </div>
      ))}
      <p data-testid="instructions">{meal.strInstructions}</p>
      <iframe data-testid="video" src={ meal.strYoutube } title={ meal.strMeal } />
      {drinks.slice(0, MAX_RECOMENDATIONS).map((drink, index) => (
        <div data-testid={ `${index}-recomendation-card` } key={ drink.strDrink }>
          <span data-testid={ `${index}-recomendation-title` }>{drink.strDrink}</span>
          <img src={ drink.strDrinkThumb } alt={ drink.strDrink } />
        </div>
      ))}
      <button className="start-recipe" type="button" data-testid="start-recipe-btn">
        Iniciar Receita
      </button>
    </div>
  );
};

MealDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number,
    }),
  }).isRequired,
};

export default MealDetails;
