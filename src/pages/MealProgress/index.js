import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const MAX_NUMBER = 20;

function MealProgress(props) {
  const {
    match: {
      params: { id },
    },
  } = props;
  const [meal, setMeal] = useState({});
  // const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    async function getMeal() {
      const promiseMeals = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const fetchedMeal = await promiseMeals.json();
      setMeal(fetchedMeal.meals[0]);
    }
    getMeal();
  }, [id]);

  const ingredients = [];
  for (let i = 1; i <= MAX_NUMBER; i += 1) {
    if (meal[`strIngredient${i}`] !== '') {
      ingredients.push(meal[`strIngredient${i}`]);
    }
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
        <div
          key={ ingredient }
          data-testid={ `${index}-ingredient-step` }
        >
          {ingredient}
        </div>
      ))}
      <p data-testid="instructions">{meal.strInstructions}</p>
      {/* {measures.map((measure, index) => (
        <div key={ measure } data-testid={ `${index}-ingredient-name-and-measure` }>
          {measure}
        </div>
      ))} */}
      <button
        // onClick={  }
        className="start-recipe"
        type="button"
        data-testid="finish-recipe-btn"
      >
        Iniciar Receita
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

// 47 - Desenvolva a tela de maneira que contenha uma imagem da receita, seu titulo, sua categoria (ou se a bebida é alcoólica ou não) uma lista de ingredientes com suas respectivas quantidade e suas instruções
// Verifica se os atributos data-testid estão presentes na tela com suas respectivas quantidades:

// A foto deve possuir o atributo data-testid="recipe-photo";
// O título deve possuir o atributo data-testid="recipe-title";
// O botão de compartilhar deve possuir o atributo data-testid="share-btn";
// O botão de favoritar deve possuir o atributo data-testid="favorite-btn";
// O texto da categoria deve possuir o atributo data-testid="recipe-category";
// Os ingredientes devem possuir o atributo data-testid=${index}-ingredient-step, a verificação será feita pelo length do atributo.
// O elemento de instruções deve possuir o atributo data-testid="instructions";
// O botão para finalizar a receita deve possuir o atributo data-testid="finish-recipe-btn".
