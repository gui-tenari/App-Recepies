import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { toggleFavoriteRecipe } from '../../redux/actions/favoriteRecipesActions';

import filledHeart from '../../images/icons/blackHeartIcon.svg';
import outlineHeart from '../../images/icons/whiteHeartIcon.svg';

import './style.css';

const typeTable = {
  comida: 'Meal',
  bebida: 'Drink',
};

const FavoriteButton = ({ recipe, type, testId }) => {
  const { favoriteRecipes } = useSelector((state) => state);
  const [isFavorite, setFavorite] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const recipeId = type === 'comida' ? recipe.idMeal : recipe.idDrink;

    setFavorite(
      favoriteRecipes.some(({ id }) => id === recipeId || id === recipe.id),
    );
  }, [favoriteRecipes, recipe, type]);

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

    dispatch(toggleFavoriteRecipe(favoriteShape, isFavorite));
    setFavorite(!isFavorite);
  }

  return (
    <button
      className="favorite-button"
      type="button"
      onClick={ handleFavoriteClick }
    >
      <img
        data-testid={ testId }
        src={ isFavorite ? filledHeart : outlineHeart }
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
