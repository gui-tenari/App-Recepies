import React from 'react';
import PropTypes from 'prop-types';
import { useLocation, useHistory } from 'react-router-dom';

import './style.css';

const RecipeCard = ({ id, thumb, name, index }) => {
  const history = useHistory();
  const { pathname } = useLocation();
  const location = pathname.includes('comidas') ? '/comidas' : '/bebidas';

  return (
    <button
      type="button"
      className="recipe-card"
      data-testid={ `${index}-recipe-card` }
      onClick={ () => history.push(`${location}/${id}`) }
    >
      <p data-testid={ `${index}-card-name` }>{name}</p>
      <div className="image-container">
        <img data-testid={ `${index}-card-img` } src={ thumb } alt={ name } />
      </div>
    </button>
  );
};

RecipeCard.propTypes = {
  thumb: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
};

export default RecipeCard;
