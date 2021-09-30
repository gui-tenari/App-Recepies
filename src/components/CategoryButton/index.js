import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

const CategoryButton = ({ category, handleFilterClick, testId }) => (
  <button
    className="category-button"
    type="button"
    data-testid={ testId }
    onClick={ () => handleFilterClick(category) }
  >
    {category}
  </button>
);

CategoryButton.propTypes = {
  category: PropTypes.string.isRequired,
  handleFilterClick: PropTypes.func.isRequired,
  testId: PropTypes.string.isRequired,
};

export default CategoryButton;
