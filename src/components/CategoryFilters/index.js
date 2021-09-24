import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import CategoryButton from '../CategoryButton';

import { setDrinkCategories } from '../../redux/actions/drinksActions';
import { setMealCategories } from '../../redux/actions/mealsActions';

import './style.css';

const CategoryFilters = ({ type }) => {
  const dispatch = useDispatch();

  const categories = useSelector((state) => state[type].categories);

  useEffect(() => {
    if (type === 'meals') {
      dispatch(setMealCategories());
    } else {
      dispatch(setDrinkCategories());
    }
  }, [dispatch, type]);

  return (
    <div className="category-filters">
      {categories.map(({ strCategory: category }) => (
        <CategoryButton key={ category } category={ category } />
      ))}
    </div>
  );
};

CategoryFilters.propTypes = {
  type: PropTypes.string.isRequired,
};

export default CategoryFilters;
