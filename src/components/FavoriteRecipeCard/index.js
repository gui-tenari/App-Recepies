import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import FavoriteButton from '../FavoriteButton';
import ShareButton from '../ShareButton';

import './style.css';

const FavoriteRecipeCard = ({ recipe, index }) => (
  <div className="done-recipe-card">
    <div className="done-image-container">
      <Link to={ `/${recipe.type}s/${recipe.id}` }>
        <img
          data-testid={ `${index}-horizontal-image` }
          src={ recipe.image }
          alt={ recipe.name }
          style={ { width: '10em' } }
        />
      </Link>
    </div>

    <div className="favorite-main-info">
      <div className="first-section">
        <p
          className="done-category"
          data-testid={ `${index}-horizontal-top-text` }
        >
          {recipe.type === 'comida'
            ? `${recipe.area} - ${recipe.category}`
            : recipe.alcoholicOrNot}
        </p>
      </div>

      <Link to={ `/${recipe.type}s/${recipe.id}` } className="done-recipe-name">
        <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
      </Link>

      <div className="buttons-section">
        <ShareButton
          type={ `${recipe.type}s` }
          id={ recipe.id }
          testId={ `${index}-horizontal-share-btn` }
        />
        <FavoriteButton
          recipe={ recipe }
          type={ recipe.type }
          testId={ `${index}-horizontal-favorite-btn` }
        />
      </div>
    </div>
  </div>
);

FavoriteRecipeCard.propTypes = {
  recipe: PropTypes.shape({
    alcoholicOrNot: PropTypes.string,
    area: PropTypes.string,
    category: PropTypes.string,
    id: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default FavoriteRecipeCard;
