import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import {
  getFavoriteRecipes,
  toggleFavoriteRecipe,
} from '../../utils/localStorageHelpers';

import whiteHeart from '../../images/whiteHeartIcon.svg';
import blackHeart from '../../images/blackHeartIcon.svg';

const FavoriteButton = ({ recipe, type }) => {
  const [isFavorite, setFavorite] = useState(false);

  useEffect(() => {
    const favoriteRecipes = getFavoriteRecipes();

    const recipeId = type === 'comida' ? recipe.idMeal : recipe.idDrink;

    setFavorite(
      favoriteRecipes.some(
        (favoriteRecipe) => favoriteRecipe.id === recipeId,
      ),
    );
  }, [recipe, type]);

  function handleFavoriteClick() {
    toggleFavoriteRecipe(recipe, type, isFavorite);
    setFavorite(!isFavorite);
  }

  return (
    <button type="button" onClick={ handleFavoriteClick }>
      <img
        data-testid="favorite-btn"
        src={ isFavorite ? blackHeart : whiteHeart }
        alt="favorite"
      />
    </button>
  );
};

FavoriteButton.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.any).isRequired,
  type: PropTypes.string.isRequired,
};

export default FavoriteButton;
