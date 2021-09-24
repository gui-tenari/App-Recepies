import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { setDrinksByCategory } from '../../redux/actions/drinksActions';
import { setMealsByCategory } from '../../redux/actions/mealsActions';

import './style.css';

const CategoryButton = ({ category, type }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    if (type === 'meals') {
      dispatch(setMealsByCategory(category));
    } else {
      dispatch(setDrinksByCategory(category));
    }
  };

  return (
    <button
      className="category-button"
      type="button"
      data-testid={ `${category}-category-filter` }
      onClick={ handleClick }
    >
      {category}
    </button>
  );
};

CategoryButton.propTypes = {
  category: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default CategoryButton;
