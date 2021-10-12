import PropTypes from 'prop-types';
import React from 'react';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Button from '../../components/Button';

import { getRandomRecipe } from '../../services/recipesAPI';

import './style.css';

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
    <>
      <Header title="Explorar Comidas" />
      <div className="explore-meals">
        <div className="explore-meal-ingredients">
          <Button
            text="Por Ingredientes"
            onClick={ () => history.push('/explorar/comidas/ingredientes') }
            testId="explore-by-ingredient"
          />
        </div>
        <div className="explore-meal-areas">
          <Button
            text="Por Local de Origem"
            onClick={ () => history.push('/explorar/comidas/area') }
            testId="explore-by-area"
          />
        </div>
        <div className="explore-random-meal">
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

ExploreMeals.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default ExploreMeals;
