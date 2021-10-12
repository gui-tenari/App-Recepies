import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

const Button = ({ text, type, disabled, className, onClick, testId }) => (
  <button
    type={ type === 'submit' ? 'submit' : 'button' }
    disabled={ disabled }
    className={ `default-button ${className}` }
    onClick={ onClick }
    data-testid={ testId }
  >
    {text}
  </button>
);

Button.propTypes = {
  text: PropTypes.string.isRequired,
  testId: PropTypes.string.isRequired,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  type: 'button',
  disabled: false,
  className: '',
  onClick: () => {},
};

export default Button;
