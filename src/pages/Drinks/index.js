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
  const { filteredDrinks, isFetching, filterInfo } = useSelector(
    ({ drinks }) => drinks,
  );
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchDrinksThunk());
  }, [dispatch]);

  if (filteredDrinks.length === 1 && filterInfo.type === 'query') {
    const { idDrink } = filteredDrinks[0];
    history.push(`/bebidas/${idDrink}`);
  }

  return (
    <>
      <Header title="Bebidas" hasSearchBar />
      <div className="recipes-content">
        <CategoryFilters type="drinks" />
        {isFetching ? (
          <Loading />
        ) : (
          <div className="recipe-list">
            {filteredDrinks.map(
              ({ idDrink, strDrinkThumb, strDrink }, index) => (
                <RecipeCard
                  key={ idDrink }
                  id={ idDrink }
                  thumb={ strDrinkThumb }
                  name={ strDrink }
                  index={ index }
                />
              ),
            )}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Drinks;
