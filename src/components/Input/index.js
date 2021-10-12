import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

const Input = ({ type, icon, placeholder, value, onChange, className, testId }) => (
  <div className={ `input-container ${className}` }>
    <label htmlFor={ placeholder }>
      {icon && <img src={ icon } alt={ `${placeholder}-icon` } />}
    </label>

    <input
      id={ placeholder }
      placeholder={ placeholder }
      type={ type }
      value={ value }
      onChange={ onChange }
      spellCheck={ false }
      data-testid={ testId }
    />

    <div className="outline" />
  </div>
);

Input.propTypes = {
  type: PropTypes.string.isRequired,
  icon: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  testId: PropTypes.string,
};

Input.defaultProps = {
  icon: undefined,
  className: '',
  testId: '',
};

export default Input;
