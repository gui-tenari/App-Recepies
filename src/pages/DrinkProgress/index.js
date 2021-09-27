import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import { indexOf } from 'lodash';

function DrinkProgress(props) {
  const {
    match: {
      params: { id },
    },
  } = props;

  const [drink, setDrink] = useState({});

  useEffect(() => {
    async function getDrinks() {
      const promiseDrinks = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      const fetchedDrinks = await promiseDrinks.json();
      setDrink(fetchedDrinks.drinks[0]);
    }
    getDrinks();
  }, [id]);

  const MAX_NUMBER = 20;

  const ingredients = [];
  for (let i = 1; i <= MAX_NUMBER; i += 1) {
    if (drink[`strIngredient${i}`]) {
      ingredients.push(drink[`strIngredient${i}`]);
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
          data-testid={ `${index}-ingredient-step` }
        >
          {ingredient}
        </div>
      ))}
      {/* {measures.map((measure, index) => (
        <div key={ measure } data-testid={ `${index}-ingredient-name-and-measure` }>
          {measure}
        </div>
      ))} */}
      <p data-testid="instructions">{drink.strInstructions}</p>
      <button
        // onClick={ startRecipe }
        className="start-recipe"
        type="button"
        data-testid="finish-recipe-btn"
      >
        Finalizar Receita
      </button>
    </div>
  );
}
DrinkProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number,
    }),
  }).isRequired,
};

export default DrinkProgress;
