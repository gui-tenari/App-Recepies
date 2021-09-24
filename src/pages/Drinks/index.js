import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import RecipeCard from '../../components/RecipeCard';
import Loading from '../../components/Loading';
import CategoryFilters from '../../components/CategoryFilters';

import { fetchDrinksThunk } from '../../redux/actions/drinksActions';

const Drinks = () => {
  const { filteredDrinks, isFetching } = useSelector(({ drinks }) => drinks);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchDrinksThunk());
  }, [dispatch]);

  if (filteredDrinks.length === 1) {
    const { idDrink } = filteredDrinks[0];
    history.push(`/bebidas/${idDrink}`);
  }

  return (
    <div>
      <Header title="Bebidas" />
      <CategoryFilters type="drinks" />
      {isFetching ? (
        <Loading />
      ) : (
        filteredDrinks.map(({ idDrink, strDrinkThumb, strDrink }, index) => (
          <RecipeCard
            key={ idDrink }
            id={ idDrink }
            thumb={ strDrinkThumb }
            name={ strDrink }
            index={ index }
          />
        ))
      )}
      <Footer />
    </div>
  );
};

export default Drinks;
