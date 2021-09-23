import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const MealDetails = (props) => {
  const {
    match: {
      params: { id },
    },
  } = props;
  const [meals, setMeals] = useState({});

  useEffect(() => {
    async function getMeal() {
      const promiseMeals = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
      );
      const fetchedMeal = await promiseMeals.json();
      setMeals(fetchedMeal.meals[0]);
    }
    getMeal();
  }, []);

  return (
    <div>
      <img data-testid="recipe-photo" alt="meal" />
      <h1 data-testid="recipe-title">{meals.name}</h1>
      <button type="button" data-testid="share-btn">
        Compartilhar
      </button>
      <button type="button" data-testid="favorite-btn">
        Favoritar
      </button>
      <p data-testid="recipe-category">Categoria</p>
      <div data-testid={ `${id}-ingredient-name-and-measure` }>Ingredientes</div>
      <p data-testid="instructions">Instruções</p>
      <video data-testid="video">
        <track default kind="captions" srcLang="en" />
        Video
      </video>
      <div data-testid={ `${id}-recomendation-card` }>Recomendações</div>
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
