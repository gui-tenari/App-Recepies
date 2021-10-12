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
    <div className="recipe-details">
      <BackButton />
      <img
        className="recipe-image"
        data-testid="recipe-photo"
        src={ drink.strDrinkThumb }
        alt={ drink.strDrink }
      />
      <div className={ `recipe-info ${isDone && 'no-bottom-padding'}` }>
        <div className="info-header">
          <div className="name-section">
            <h1 data-testid="recipe-title">{drink.strDrink}</h1>
            <p data-testid="recipe-category">{drink.strAlcoholic}</p>
          </div>
          <div className="icons-section">
            <ShareButton type="bebidas" id={ drink.idDrink } testId="share-btn" />
            <FavoriteButton
              recipe={ drink }
              type="bebida"
              testId="favorite-btn"
            />
          </div>
        </div>

        <div className="section-name">Ingredients</div>

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

        <div className="section-name">Instructions</div>
        <p className="instructions" data-testid="instructions">
          {drink.strInstructions}
        </p>

        <div className="section-name">Recommendations</div>
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
              <div className="image-container">
                <img src={ meal.strMealThumb } alt={ meal.strMeal } />
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

export default DrinkDetails;
