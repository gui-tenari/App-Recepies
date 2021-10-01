import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import {
  getFavoriteRecipes,
  toggleFavoriteRecipe,
} from '../../utils/localStorageHelpers';

import whiteHeart from '../../images/whiteHeartIcon.svg';
import blackHeart from '../../images/blackHeartIcon.svg';

const typeTable = {
  comida: 'Meal',
  bebida: 'Drink',
};

const FavoriteButton = ({ recipe, type, testId }) => {
  const [isFavorite, setFavorite] = useState(false);

  useEffect(() => {
    const favoriteRecipes = getFavoriteRecipes();

    const recipeId = type === 'comida' ? recipe.idMeal : recipe.idDrink;

    setFavorite(
      favoriteRecipes.some(({ id }) => id === recipeId || id === recipe.id),
    );
  }, [recipe, type]);

  function getFavoriteShape() {
    if (recipe[`id${typeTable[type]}`]) {
      return {
        id: recipe[`id${typeTable[type]}`],
        type,
        area: recipe.strArea || '',
        category: recipe.strCategory,
        alcoholicOrNot: recipe.strAlcoholic || '',
        name: recipe[`str${typeTable[type]}`],
        image: recipe[`str${typeTable[type]}Thumb`],
      };
    }

    return recipe;
  }

  function handleFavoriteClick() {
    const favoriteShape = getFavoriteShape();

    toggleFavoriteRecipe(favoriteShape, type, isFavorite);
    setFavorite(!isFavorite);
  }

  return (
    <button type="button" onClick={ handleFavoriteClick }>
      <img
        data-testid={ testId }
        src={ isFavorite ? blackHeart : whiteHeart }
        alt="favorite"
      />
    </button>
  );
};

FavoriteButton.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.any).isRequired,
  type: PropTypes.string.isRequired,
  testId: PropTypes.string.isRequired,
};

export default FavoriteButton;
