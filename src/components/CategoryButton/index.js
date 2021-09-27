import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

const CategoryButton = ({ category, handleFilterClick }) => (
  <button
    className="category-button"
    type="button"
    data-testid={ `${category}-category-filter` }
    onClick={ () => handleFilterClick(category) }
  >
    {category}
  </button>
);

CategoryButton.propTypes = {
  category: PropTypes.string.isRequired,
  handleFilterClick: PropTypes.func.isRequired,
};

export default CategoryButton;
