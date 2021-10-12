import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import SearchBar from '../SearchBar';

import searchIcon from '../../images/icons/searchIcon.svg';
import userIcon from '../../images/icons/profileIcon.svg';

import './style.css';

const Header = ({ title, hasSearchBar }) => {
  // const [inputValue, setInputValue] = useState('');
  const [showInputSearch, setShowInputSearch] = useState(false);

  return (
    <header>
      <Link to="/perfil" className="user-button">
        <img data-testid="profile-top-btn" src={ userIcon } alt="Perfil" />
      </Link>
      <h1 className="page-title" data-testid="page-title">
        {title}
      </h1>
      <div className="search-section">
        {showInputSearch && (
          <SearchBar
            showInputSearch={ showInputSearch }
            setShowInputSearch={ setShowInputSearch }
          />
        )}
        {hasSearchBar && (
          <button
            type="button"
            className="search-icon"
            onClick={ () => {
              setShowInputSearch(!showInputSearch);
            } }
          >
            <img
              data-testid="search-top-btn"
              src={ searchIcon }
              alt="Pesquisar"
            />
          </button>
        )}
      </div>
    </header>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  hasSearchBar: PropTypes.bool,
};

Header.defaultProps = {
  hasSearchBar: false,
};

export default Header;
