import React from 'react';
import PropTypes from 'prop-types';

const RecipeCard = ({ thumb, name, index }) => (
  <div data-testid={ `${index}-recipe-card` }>
    <img data-testid={ `${index}-card-img` } src={ thumb } alt={ name } />
    <p data-testid={ `${index}-card-name` }>{name}</p>
  </div>
);

RecipeCard.propTypes = {
  thumb: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default RecipeCard;
