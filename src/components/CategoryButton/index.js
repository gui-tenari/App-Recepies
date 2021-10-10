import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

const CategoryButton = ({ category, handleFilterClick, testId, activeFilter }) => (
  <button
    className={ `category-button ${activeFilter === category && 'active-filter'}` }
    type="button"
    data-testid={ testId }
    onClick={ () => handleFilterClick(category) }
  >
    {category.replace('Milk / ', '')}
  </button>
);

CategoryButton.propTypes = {
  category: PropTypes.string.isRequired,
  handleFilterClick: PropTypes.func.isRequired,
  activeFilter: PropTypes.string.isRequired,
  testId: PropTypes.string,
};

CategoryButton.defaultProps = {
  testId: '',
};

export default CategoryButton;
