import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import ShareButton from '../ShareButton';

import './style.css';

const DoneRecipeCard = ({ recipe, index }) => (
  <div className="done-recipe-card">
    <div className="done-image-container">
      <Link to={ `/${recipe.type}s/${recipe.id}` }>
        <img
          style={ { width: '11em' } }
          data-testid={ `${index}-horizontal-image` }
          src={ recipe.image }
          alt={ recipe.name }
        />
      </Link>
    </div>
    <div className="done-main-info">
      <div className="first-section">
        <p
          className="done-category"
          data-testid={ `${index}-horizontal-top-text` }
        >
          {recipe.type === 'comida'
            ? `${recipe.area} - ${recipe.category}`
            : recipe.alcoholicOrNot}
        </p>
        <ShareButton
          type={ `${recipe.type}s` }
          id={ recipe.id }
          testId={ `${index}-horizontal-share-btn` }
        />
      </div>
      <div className="second-section">
        <Link to={ `/${recipe.type}s/${recipe.id}` } className="done-recipe-name">
          <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
        </Link>
        <p
          className="done-recipe-date"
          data-testid={ `${index}-horizontal-done-date` }
        >
          {`feita em: ${recipe.doneDate}`}
        </p>
      </div>
      <div className="tag-section">
        {recipe.tags.map((tag) => (
          <span
            className="done-recipe-tag"
            key={ tag }
            data-testid={ `${index}-${tag}-horizontal-tag` }
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  </div>
);
DoneRecipeCard.propTypes = {
  recipe: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  ).isRequired,
  index: PropTypes.number.isRequired,
};

export default DoneRecipeCard;
