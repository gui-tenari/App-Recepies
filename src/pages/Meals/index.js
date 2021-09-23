import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import RecipeCard from '../../components/RecipeCard';
import Loading from '../../components/Loading';

import { fetchMealsThunk } from '../../redux/actions/mealsActions';

const Meals = () => {
  const { mealList, isFetching } = useSelector(({ meals }) => meals);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMealsThunk());
  }, [dispatch]);

  return (
    <div>
      <Header title="Comidas" />
      <h1>MEALS</h1>
      {isFetching ? (
        <Loading />
      ) : (
        mealList.map(({ idMeal, strMealThumb, strMeal }, index) => (
          <RecipeCard
            key={ idMeal }
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
