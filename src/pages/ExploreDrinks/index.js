import PropTypes from 'prop-types';
import React from 'react';

import Header from '../../components/Header';
import { getRandomRecipe } from '../../services/recipesAPI';

const ExploreDrinks = ({ history }) => {
  const handleClick = async () => {
    const { drinks } = await getRandomRecipe('drinks');
    const { idDrink } = drinks[0];
    history.push(`/bebidas/${idDrink}`);
  };

  return (
    <div>
      <Header title="Explorar Bebidas" />
      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ () => history.push('/explorar/bebidas/ingredientes') }
      >
        Por Ingredientes
      </button>
      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ handleClick }
      >
        Me Surpreenda!
      </button>
    </div>
  );
};

ExploreDrinks.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default ExploreDrinks;
