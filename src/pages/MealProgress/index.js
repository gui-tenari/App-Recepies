import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import './style.css';

const MAX_NUMBER = 20;

function MealProgress(props) {
  const {
    match: {
      params: { id },
    },
  } = props;
  const [meal, setMeal] = useState({});
  const [saveIngredient, setSaveIngredient] = useState([]);
  // const [, setSaveIngredient] = useState(false);
  const history = useHistory();

  useEffect(() => {
    async function getMeal() {
      const promiseMeals = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const fetchedMeal = await promiseMeals.json();
      setMeal(fetchedMeal.meals[0]);
    }
    getMeal();
    // return(() => {

    // });
  }, [id]);

  function handlerClick(e) {
    if (e.target.checked && !saveIngredient.includes(e.target.name)) {
      setSaveIngredient([...saveIngredient, e.target.name]);
      console.log(saveIngredient);
    } else {
      setSaveIngredient(saveIngredient.filter((name) => e.target.name !== name));
    }
  }

  useEffect(() => {

  }, []);

  const ingredients = [];
  for (let i = 1; i <= MAX_NUMBER; i += 1) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(meal[`strIngredient${i}`]);
    }
  }

  function handleClickComidas() {
    history.push('/receitas-feitas');
  }

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
      {ingredients.map((ingredient, index) => (
        <label
          key={ ingredient }
          data-testid={ `${index}-ingredient-step` }
          htmlFor={ `${index}-ingredient` }
          className={ saveIngredient.includes(ingredient) ? 'finished' : '' }
        >
          <input
            type="checkbox"
            id={ `${index}-ingredient` }
            name={ ingredient }
            onClick={ handlerClick }
          />
          {ingredient}
        </label>
      ))}
      <p data-testid="instructions">{meal.strInstructions}</p>
      <button
        onClick={ handleClickComidas }
        className="start-recipe"
        type="button"
        data-testid="finish-recipe-btn"
      >
        Finalizar Receita
      </button>
    </div>
  );
}

MealProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number,
    }),
  }).isRequired,
};

export default MealProgress;
