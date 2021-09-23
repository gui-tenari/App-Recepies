import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import RecipeCard from '../../components/RecipeCard';
import Loading from '../../components/Loading';

import { fetchDrinksThunk } from '../../redux/actions/drinksActions';

const Drinks = () => {
  const { drinkList, isFetching } = useSelector(({ drinks }) => drinks);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDrinksThunk());
  }, [dispatch]);

  return (
    <div>
      <Header title="Bebidas" />
      <h1>Bebidas</h1>
      {isFetching ? (
        <Loading />
      ) : (
        drinkList.map(({ idDrink, strDrinkThumb, strDrink }, index) => (
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
