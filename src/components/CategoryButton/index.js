import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

const CategoryButton = ({ category }) => (
  <button
    className="category-button"
    type="button"
    data-testid={ `${category}-category-filter` }
  >
    {category}
  </button>
);

CategoryButton.propTypes = {
  category: PropTypes.string.isRequired,
};

export default CategoryButton;
