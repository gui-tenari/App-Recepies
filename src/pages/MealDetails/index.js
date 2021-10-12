import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import Loading from '../../components/Loading';
import ShareButton from '../../components/ShareButton';
import FavoriteButton from '../../components/FavoriteButton';
import BackButton from '../../components/BackButton';
import Button from '../../components/Button';

import getIngredients from '../../utils/getIngredients';

import './style.css';

const MAX_RECOMENDATIONS = 6;

const MealDetails = () => {
  const [meal, setMeal] = useState({});
  const [drinks, setDrinks] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  const history = useHistory();
  const { id } = useParams();

  const isDone = useSelector(({ doneRecipes }) => doneRecipes
    .some((recipe) => recipe.id === id));
  const isInProgress = useSelector(
    ({ inProgressRecipes }) => !!inProgressRecipes.meals[id],
  );

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
    <div className="recipe-details">
      <BackButton />
      <img
        className="recipe-image"
        data-testid="recipe-photo"
        src={ meal.strMealThumb }
        alt={ meal.strMeal }
      />
      <div className={ `recipe-info ${isDone && 'no-bottom-padding'}` }>
        <div className="info-header">
          <div className="name-section">
            <h1 data-testid="recipe-title">{meal.strMeal}</h1>
            <p data-testid="recipe-category">{meal.strCategory}</p>
          </div>
          <div className="icons-section">
            <ShareButton type="comidas" id={ meal.idMeal } testId="share-btn" />
            <FavoriteButton recipe={ meal } type="comida" testId="favorite-btn" />
          </div>
        </div>

        <p className="section-name">Ingredients</p>

        <div className="ingredients-section">
          {ingredients.map(({ ingredient, measure }, index) => (
            <div
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              <p>
                {`- ${ingredient}`}
                {measure && <span>{` - ${measure}`}</span>}
              </p>
            </div>
          ))}
        </div>

        <p className="section-name">Instructions</p>
        <p className="instructions" data-testid="instructions">
          {meal.strInstructions}
        </p>

        <p className="section-name">Video</p>
        <iframe
          className="recipe-video"
          data-testid="video"
          src={ meal.strYoutube.replace('watch?v=', 'embed/') }
          title={ meal.strMeal }
        />

        <p className="section-name">Recommendations</p>
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
              <div className="image-container">
                <img src={ drink.strDrinkThumb } alt={ drink.strDrink } />
              </div>
            </div>
          ))}
        </div>

        {!isDone && (
          <Button
            text={ isInProgress ? 'Continuar Receita' : 'Iniciar Receita' }
            onClick={ () => startRecipe() }
            testId="start-recipe-btn"
          />
        )}
      </div>
    </div>
  );
};

export default MealDetails;
