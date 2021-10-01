import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';

import FavoriteButton from '../FavoriteButton';
import ShareButton from '../ShareButton';

const FavoriteRecipeCard = ({ recipe, index }) => {
  const { pathname } = useLocation();

  return (
    <div>
      <img
        data-testid={ `${index}-horizontal-image` }
        src={ recipe.image }
        alt={ recipe.name }
      />
      <p data-testid={ `${index}-horizontal-top-text` }>{recipe.category}</p>
      <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
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
      <Link
        to={ `${pathname}/${recipe.id}` }
        data-testid={ `${index}-recipe-card` }
      >
        Mais detalhes
      </Link>
    </div>
  );
};

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
