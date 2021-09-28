import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import Loading from '../../components/Loading';

import {
  getFavoriteRecipes,
  toggleFavoriteRecipe,
} from '../../utils/localStorageHelpers';

import whiteHeart from '../../images/whiteHeartIcon.svg';
import blackHeart from '../../images/blackHeartIcon.svg';
import shareIcon from '../../images/shareIcon.svg';

import './style.css';

const MAX_RECOMENDATIONS = 6;
const MAX_NUMBER = 20;
const COPIED_LINK_ALERT_TIME = 3000;

const MealDetails = (props) => {
  const {
    match: {
      params: { id },
    },
  } = props;

  const [meal, setMeal] = useState({});
  const [drinks, setDrinks] = useState([]);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isFavorite, setFavorite] = useState(false);

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
    const favoriteRecipes = getFavoriteRecipes();

    setFavorite(
      favoriteRecipes.some(
        (favoriteRecipe) => favoriteRecipe.id === meal.idMeal,
      ),
    );
  }, [meal]);

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

  function startRecipe() {
    history.push(`/comidas/${id}/in-progress`);
  }

  function handleFavoriteClick() {
    toggleFavoriteRecipe(meal, 'comida', isFavorite);
    setFavorite(!isFavorite);
  }

  function handleShareClick() {
    navigator.clipboard.writeText(global.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), COPIED_LINK_ALERT_TIME);
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
      <button type="button" data-testid="share-btn" onClick={ handleShareClick }>
        <img src={ shareIcon } alt="share" />
      </button>
      <button type="button" onClick={ handleFavoriteClick }>
        <img
          data-testid="favorite-btn"
          src={ isFavorite ? blackHeart : whiteHeart }
          alt="favorite"
        />
      </button>
      {copiedLink && <p>Link copiado!</p>}
      <p data-testid="recipe-category">{meal.strCategory}</p>
      {ingredients.map((ingredient, index) => (
        <div key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
          {ingredient}
        </div>
      ))}
      {measures.map((measure, index) => (
        <div key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
          {measure}
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
