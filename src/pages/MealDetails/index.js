import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import Loading from '../../components/Loading';
import ShareButton from '../../components/ShareButton';
import FavoriteButton from '../../components/FavoriteButton';

import getIngredients from '../../utils/getIngredients';

import './style.css';

const MAX_RECOMENDATIONS = 6;

const MealDetails = (props) => {
  const {
    match: {
      params: { id },
    },
  } = props;

  const [meal, setMeal] = useState({});
  const [drinks, setDrinks] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  const history = useHistory();

  useEffect(() => {
    async function getMeal() {
      const promiseMeals = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
      );
      const { meals } = await promiseMeals.json();
      const fetchedMeal = meals[0];
      setMeal(fetchedMeal);
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

  useEffect(() => {
    setIngredients(getIngredients(meal));
  }, [meal]);

  function startRecipe() {
    history.push(`/comidas/${id}/in-progress`);
  }

  if (!meal.strMeal) {
    return <Loading />;
  }

  return (
    <div>
      <img
        data-testid="recipe-photo"
        src={ meal.strMealThumb }
        alt={ meal.strMeal }
      />
      <h1 data-testid="recipe-title">{meal.strMeal}</h1>
      <ShareButton />
      <FavoriteButton recipe={ meal } type="comida" />
      <p data-testid="recipe-category">{meal.strCategory}</p>
      {ingredients.map(({ ingredient, measure }, index) => (
        <div key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
          <p>
            {ingredient}
            {measure && <span>{` - ${measure}`}</span>}
          </p>
        </div>
      ))}
      <p data-testid="instructions">{meal.strInstructions}</p>
      <iframe
        data-testid="video"
        src={ meal.strYoutube.replace('watch?v=', 'embed/') }
        title={ meal.strMeal }
      />
      <div className="carousel">
        {drinks.slice(0, MAX_RECOMENDATIONS).map((drink, index) => (
          <div
            className="recommendation-card"
            data-testid={ `${index}-recomendation-card` }
            key={ drink.strDrink }
          >
            <span data-testid={ `${index}-recomendation-title` }>
              {drink.strDrink}
            </span>
            <img src={ drink.strDrinkThumb } alt={ drink.strDrink } />
          </div>
        ))}
      </div>
      <button
        onClick={ startRecipe }
        className="start-recipe"
        type="button"
        data-testid="start-recipe-btn"
      >
        Iniciar Receita
      </button>
    </div>
  );
};

MealDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default MealDetails;
