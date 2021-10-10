import React, { useEffect } from 'react';
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
  const categories = useSelector((state) => state[type].categories);
  const { mealList } = useSelector(({ meals }) => meals);
  const { drinkList } = useSelector(({ drinks }) => drinks);

  const activeFilter = useSelector(({ meals, drinks }) => {
    if (type === 'meals') {
      const { term, type: filterType } = meals.filterInfo;

      if (term && filterType === 'category') return term;

      return 'All';
    }

    const { term, type: filterType } = drinks.filterInfo;

    if (term && filterType === 'category') return term;

    return 'All';
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (type === 'meals') {
      dispatch(setMealCategories());
    } else {
      dispatch(setDrinkCategories());
    }
  }, [dispatch, type]);

  const handleAllClick = () => {
    if (type === 'meals') {
      dispatch(setFilteredMeals(mealList, { term: '', type: 'category' }));
    } else {
      dispatch(setFilteredDrinks(drinkList, { term: '', type: 'category' }));
    }
  };

  const handleFilterClick = (category) => {
    if (type === 'meals') {
      if (activeFilter === category) {
        dispatch(
          setFilteredMeals(mealList, { term: category, type: 'category' }),
        );
      } else {
        dispatch(setMealsByCategory(category));
      }
    } else if (activeFilter === category) {
      dispatch(
        setFilteredDrinks(drinkList, { term: category, type: 'category' }),
      );
    } else {
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
