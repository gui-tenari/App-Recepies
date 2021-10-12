import React from 'react';
import { useHistory } from 'react-router-dom';

import backIcon from '../../images/icons/backIcon.svg';

import './style.css';

const BackButton = () => {
  const history = useHistory();

  return (
    <button
      className="back-button"
      type="button"
      onClick={ () => history.goBack() }
    >
      <img src={ backIcon } alt="back" />
    </button>
  );
};

export default BackButton;
