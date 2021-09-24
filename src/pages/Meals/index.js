import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import RecipeCard from '../../components/RecipeCard';
import Loading from '../../components/Loading';

import { fetchMealsThunk } from '../../redux/actions/mealsActions';

const Meals = () => {
  const { filteredMeals, isFetching } = useSelector(({ meals }) => meals);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchMealsThunk());
  }, [dispatch]);

  if (filteredMeals.length === 1) {
    const { idMeal } = filteredMeals[0];

    history.push(`/comidas/${idMeal}`);
  }

  return (
    <div>
      <Header title="Comidas" hasSearchBar />
      <h1>MEALS</h1>
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
