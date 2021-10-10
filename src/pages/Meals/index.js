import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import RecipeCard from '../../components/RecipeCard';
import Loading from '../../components/Loading';
import CategoryFilters from '../../components/CategoryFilters';

import { fetchMealsThunk } from '../../redux/actions/mealsActions';

import './style.css';

const Meals = () => {
  const { filteredMeals, isFetching, filterInfo } = useSelector(
    ({ meals }) => meals,
  );
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchMealsThunk());
  }, [dispatch]);

  if (filteredMeals.length === 1 && filterInfo.type === 'query') {
    const { idMeal } = filteredMeals[0];

    history.push(`/comidas/${idMeal}`);
  }

  return (
    <>
      <Header title="Comidas" hasSearchBar />
      <div className="recipes-content">
        <CategoryFilters type="meals" />
        {isFetching ? (
          <Loading />
        ) : (
          <div className="recipe-list">
            {filteredMeals.map(({ idMeal, strMealThumb, strMeal }, index) => (
              <RecipeCard
                key={ idMeal }
                id={ idMeal }
                thumb={ strMealThumb }
                name={ strMeal }
                index={ index }
              />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Meals;
