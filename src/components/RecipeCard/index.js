import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';

import './style.css';

const RecipeCard = ({ id, thumb, name, index }) => {
  const { pathname } = useLocation();
  const location = pathname.includes('comidas') ? '/comidas' : 'bebidas';
  return (
    <div className="recipe-card">
      <img data-testid={ `${index}-card-img` } src={ thumb } alt={ name } />
      <p data-testid={ `${index}-card-name` }>{name}</p>
      <Link to={ `${location}/${id}` } data-testid={ `${index}-recipe-card` }>
        Mais detalhes
      </Link>
    </div>
  );
};

RecipeCard.propTypes = {
  thumb: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
};

export default RecipeCard;
