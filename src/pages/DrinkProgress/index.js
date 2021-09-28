import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

function DrinkProgress(props) {
  const {
    match: {
      params: { id },
    },
  } = props;

  const [drink, setDrink] = useState({});
  const history = useHistory();

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

  function handleClickBebidas() {
    history.push('/receitas-feitas');
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
        <label
          key={ ingredient }
          data-testid={ `${index}-ingredient-step` }
          htmlFor={ `${index}-ingredient` }
        >
          <input
            type="checkbox"
            id={ `${index}-ingredient` }
          />
          {ingredient}
        </label>
      ))}
      <p data-testid="instructions">{drink.strInstructions}</p>
      <button
        onClick={ handleClickBebidas }
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
