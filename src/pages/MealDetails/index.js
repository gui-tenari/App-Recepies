import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const MAX_RECOMENDATIONS = 6;

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
      <div data-testid={ `${id}-ingredient-name-and-measure` }>Ingredientes</div>
      <p data-testid="instructions">{meal.strInstructions}</p>
      <iframe data-testid="video" src={ meal.strYoutube } title={ meal.strMeal } />
      {drinks.slice(0, MAX_RECOMENDATIONS).map((drink, index) => (
        <div data-testid={ `${index}-recomendation-card` } key={ drink.strDrink }>
          <span data-testid={ `${index}-recomendation-title` }>{drink.strDrink}</span>
          <img src={ drink.strDrinkThumb } alt={ drink.strDrink } />
        </div>
      ))}
      <button type="button" data-testid="start-recipe-btn">
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
