import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';

const Header = ({ title }) => {
  const [inputValue, setInputValue] = useState('');
  const [showInputSearch, setShowInputSearch] = useState(false);

  return (
    <header>
      <Link to="/profile">
        <img data-testid="profile-top-btn" src={ profileIcon } alt="Perfil" />
      </Link>
      <div>
        <h1 data-testid="page-title">{title}</h1>
      </div>
      <div>
        {showInputSearch && (
          <input
            data-testid="search-input"
            type="text"
            value={ inputValue }
            onChange={ ({ target }) => setInputValue(target.value) }
          />
        )}
        <button
          type="button"
          onClick={ () => {
            setShowInputSearch(!showInputSearch);
          } }
        >
          <img data-testid="search-top-btn" src={ searchIcon } alt="Pesquisar" />
        </button>
      </div>
    </header>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
