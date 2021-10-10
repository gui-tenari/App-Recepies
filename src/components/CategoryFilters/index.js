import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import CategoryButton from '../CategoryButton';

import {
  setDrinkCategories,
  setDrinksByCategory,
  setFilteredDrinks,
} from '../../redux/actions/drinksActions';
import {
  setMealCategories,
  setMealsByCategory,
  setFilteredMeals,
} from '../../redux/actions/mealsActions';

import './style.css';

const CategoryFilters = ({ type }) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const dispatch = useDispatch();

  const categories = useSelector((state) => state[type].categories);
  const { mealList } = useSelector(({ meals }) => meals);
  const { drinkList } = useSelector(({ drinks }) => drinks);

  useEffect(() => {
    if (type === 'meals') {
      dispatch(setMealCategories());
    } else {
      dispatch(setDrinkCategories());
    }
  }, [dispatch, type]);

  const handleAllClick = () => {
    if (type === 'meals') {
      dispatch(setFilteredMeals(mealList, ''));
    } else {
      dispatch(setFilteredDrinks(drinkList, ''));
    }

    setActiveFilter('All');
  };

  const handleFilterClick = (category) => {
    if (type === 'meals') {
      if (activeFilter === category) {
        setActiveFilter('All');
        dispatch(setFilteredMeals(mealList, ''));
      } else {
        setActiveFilter(category);
        dispatch(setMealsByCategory(category));
      }
    } else if (activeFilter === category) {
      setActiveFilter('All');
      dispatch(setFilteredDrinks(drinkList, ''));
    } else {
      setActiveFilter(category);
      dispatch(setDrinksByCategory(category));
    }
  };

  return (
    <div className="category-filters">
      <CategoryButton
        category="All"
        type={ type }
        handleFilterClick={ handleAllClick }
        testId="All-category-filter"
        activeFilter={ activeFilter }
      />
      {categories.map(({ strCategory: category }) => (
        <CategoryButton
          key={ category }
          category={ category }
          testId={ `${category}-category-filter` }
          type={ type }
          handleFilterClick={ handleFilterClick }
          activeFilter={ activeFilter }
        />
      ))}
    </div>
  );
};

CategoryFilters.propTypes = {
  type: PropTypes.string.isRequired,
};

export default CategoryFilters;
