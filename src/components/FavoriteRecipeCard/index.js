import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import FavoriteButton from '../FavoriteButton';
import ShareButton from '../ShareButton';

const FavoriteRecipeCard = ({ recipe, index }) => (
  <div>
    <Link to={ `/${recipe.type}s/${recipe.id}` }>
      <img
        data-testid={ `${index}-horizontal-image` }
        src={ recipe.image }
        alt={ recipe.name }
        style={ { width: '10em' } }
      />
    </Link>
    <p data-testid={ `${index}-horizontal-top-text` }>
      {recipe.type === 'comida' ? recipe.area : recipe.alcoholicOrNot}
      {' - '}
      {recipe.category}
    </p>
    <Link to={ `/${recipe.type}s/${recipe.id}` }>
      <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
    </Link>

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
