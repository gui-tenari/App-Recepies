import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';

const RecipeCard = ({ id, thumb, name, index }) => {
  const { pathname } = useLocation();
  return (
    <div data-testid={`${index}-recipe-card`}>
      <img data-testid={`${index}-card-img`} src={thumb} alt={name} />
      <p data-testid={`${index}-card-name`}>{name}</p>
      <Link to={ `${pathname}/${id}` }>Mais detalhes</Link>
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
