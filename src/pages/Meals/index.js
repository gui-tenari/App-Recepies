import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import RecipeCard from '../../components/RecipeCard';
import Loading from '../../components/Loading';
import CategoryFilters from '../../components/CategoryFilters';

import { fetchMealsThunk } from '../../redux/actions/mealsActions';

const Meals = () => {
  const { filteredMeals, isFetching, filterType } = useSelector(({ meals }) => meals);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchMealsThunk());
  }, [dispatch]);

  if (filteredMeals.length === 1 && filterType === 'query') {
    const { idMeal } = filteredMeals[0];

    history.push(`/comidas/${idMeal}`);
  }

  return (
    <div>
      <Header title="Comidas" />
      <CategoryFilters type="meals" />
      {isFetching ? (
        <Loading />
      ) : (
        filteredMeals.map(({ idMeal, strMealThumb, strMeal }, index) => (
          <RecipeCard
            key={ idMeal }
            id={ idMeal }
            thumb={ strMealThumb }
            name={ strMeal }
            index={ index }
          />
        ))
      )}
      <Footer />
    </div>
  );
};

export default Meals;
