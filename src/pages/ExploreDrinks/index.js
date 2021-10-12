import PropTypes from 'prop-types';
import React from 'react';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Button from '../../components/Button';

import { getRandomRecipe } from '../../services/recipesAPI';

import './style.css';

const ExploreDrinks = ({ history }) => {
  const handleClick = async () => {
    try {
      const { drinks } = await getRandomRecipe('drinks');
      const { idDrink } = drinks[0];
      history.push(`/bebidas/${idDrink}`);
    } catch (error) {
      global.alert('nenhuma receita encontrada');
    }
  };

  return (
    <>
      <Header title="Explorar Bebidas" />
      <div className="explore-drinks">
        <div className="explore-drink-ingredients">
          <Button
            text="Por Ingredientes"
            onClick={ () => history.push('/explorar/bebidas/ingredientes') }
            testId="explore-by-ingredient"
          />
        </div>
        <div className="explore-random-drink">
          <Button
            text="Me Surpreenda!"
            onClick={ handleClick }
            testId="explore-surprise"
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

ExploreDrinks.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default ExploreDrinks;
