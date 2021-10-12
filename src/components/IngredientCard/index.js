import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { setMealsByIngredient } from '../../redux/actions/mealsActions';
import { setDrinksByIngredient } from '../../redux/actions/drinksActions';

import './style.css';

const IngredientCard = ({ ingredient, index, type }) => {
  const BASE_URL_MEAL_IMG = 'https://www.themealdb.com/images/ingredients';
  const BASE_URL_DRINK_IMG = 'https://www.thecocktaildb.com/images/ingredients';
  const dispatch = useDispatch();
  let URL;
  let ingredientName;
  if (type === 'meals') {
    const { strIngredient } = ingredient;
    ingredientName = strIngredient;
    URL = `${BASE_URL_MEAL_IMG}/${strIngredient}-Small.png`;
  } else {
    const { strIngredient1 } = ingredient;
    ingredientName = strIngredient1;
    URL = `${BASE_URL_DRINK_IMG}/${strIngredient1}-Small.png`;
  }

  const handleClick = () => {
    if (type === 'meals') {
      dispatch(setMealsByIngredient(type, ingredientName));
    } else {
      dispatch(setDrinksByIngredient(type, ingredientName));
    }
  };

  return (
    <Link
      className="ingredient-card"
      to={ type === 'meals' ? '/comidas' : '/bebidas' }
      onClick={ handleClick }
      data-testid={ `${index}-ingredient-card` }
    >
      <p data-testid={ `${index}-card-name` }>{ingredientName}</p>
      <div className="image-container">
        <img data-testid={ `${index}-card-img` } src={ URL } alt={ ingredientName } />
      </div>
    </Link>
  );
};

IngredientCard.propTypes = {
  index: PropTypes.number.isRequired,
  ingredient: PropTypes.shape({
    strIngredient: PropTypes.string,
    strIngredient1: PropTypes.string,
  }),
  type: PropTypes.string.isRequired,
};

IngredientCard.defaultProps = {
  ingredient: PropTypes.shape({
    strIngredient: '',
    strIngredient1: '',
  }).isRequired,
};

export default IngredientCard;
