import PropTypes from 'prop-types';
import React from 'react';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { getRandomRecipe } from '../../services/recipesAPI';

const ExploreMeals = ({ history }) => {
  const handleClick = async () => {
    try {
      const { meals } = await getRandomRecipe('meals');
      const { idMeal } = meals[0];
      history.push(`/comidas/${idMeal}`);
    } catch (error) {
      global.alert('nenhuma receita encotrada');
    }
  };

  return (
    <div>
      <Header title="Explorar Comidas" />
      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ () => history.push('/explorar/comidas/ingredientes') }
      >
        Por Ingredientes
      </button>
      <button
        type="button"
        data-testid="explore-by-area"
        onClick={ () => history.push('/explorar/comidas/area') }
      >
        Por Local de Origem
      </button>
      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ handleClick }
      >
        Me Surpreenda!
      </button>
      <Footer />
    </div>
  );
};

ExploreMeals.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default ExploreMeals;
