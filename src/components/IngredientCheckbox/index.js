import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

const IngredientCheckbox = ({ text, name, isChecked, onChange, index }) => (
  <label
    data-testid={ `${index}-ingredient-step` }
    htmlFor={ `${index}-ingredient` }
    className={
      isChecked ? 'ingredient-checkbox finished' : 'ingredient-checkbox'
    }
  >
    <input
      type="checkbox"
      id={ `${index}-ingredient` }
      name={ name }
      checked={ isChecked }
      onChange={ onChange }
    />
    <div className="custom-checkbox">
      <div className="checkmark" />
    </div>
    {text}
  </label>
);

IngredientCheckbox.propTypes = {
  text: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  isChecked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

export default IngredientCheckbox;
