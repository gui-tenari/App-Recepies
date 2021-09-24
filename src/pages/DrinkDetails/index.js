import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const MAX_RECOMENDATIONS = 6;
const MAX_NUMBER = 20;

const DrinkDetails = (props) => {
  const { match: { params: { id } } } = props;
  const [drink, setDrink] = useState({});
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    async function getDrink() {
      const promiseDrinks = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      const fetchedDrink = await promiseDrinks.json();
      setDrink(fetchedDrink.drinks[0]);
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

  const ingredients = [];
  for (let i = 1; i <= MAX_NUMBER; i += 1) {
    if (drink[`strIngredient${i}`] !== '') {
      ingredients.push(drink[`strIngredient${i}`]);
    }
  }
  const measures = [];
  for (let i = 1; i <= MAX_NUMBER; i += 1) {
    if (drink[`strMeasure${i}`] !== '') {
      measures.push(drink[`strMeasure${i}`]);
    }
  }

  return (
    <div>
      <img
        data-testid="recipe-photo"
        src={ drink.strDrinkThumb }
        alt={ drink.strDrink }
      />
      <h1 data-testid="recipe-title">{drink.strDrink}</h1>
      <button type="button" data-testid="share-btn">
        Compartilhar
      </button>
      <button type="button" data-testid="favorite-btn">
        Favoritar
      </button>
      <p data-testid="recipe-category">{drink.strAlcoholic}</p>
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
      <p data-testid="instructions">{drink.strInstructions}</p>
      <iframe data-testid="video" src={ drink.strYoutube } title={ drink.strDrink } />
      {meals.slice(0, MAX_RECOMENDATIONS).map((meal, index) => (
        <div data-testid={ `${index}-recomendation-card` } key={ meal.strDrink }>
          <span data-testid={ `${index}-recomendation-title` }>{meal.strDrink}</span>
          <img src={ meal.strDrinkThumb } alt={ meal.strDrink } />
        </div>
      ))}
      <button type="button" data-testid="start-recipe-btn">
        Iniciar Receita
      </button>
    </div>
  );
};

DrinkDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number,
    }),
  }).isRequired,
};

export default DrinkDetails;
