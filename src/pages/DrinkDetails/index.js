import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const DrinkDetails = (props) => {
  const { match: { params: { id } } } = props;
  const [drink, setDrink] = useState({});
  const [meals, setMeals] = useState({});

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

  return (
    <div>
      <img data-testid="recipe-photo" alt="drink" />
      <h1 data-testid="recipe-title">{drink.name}</h1>
      <button type="button" data-testid="share-btn">Compartilhar</button>
      <button type="button" data-testid="favorite-btn">Favoritar</button>
      <p data-testid="recipe-category">Categoria</p>
      <div data-testid={ `${id}-ingredient-name-and-measure` }>Ingredientes</div>
      <p data-testid="instructions">Instruções</p>
      <div data-testid={ `${id}-recomendation-card` }>Recomendações</div>
      <button type="button" data-testid="start-recipe-btn">Iniciar Receita</button>
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
