import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import SearchBar from '../SearchBar';

import searchIcon from '../../images/icons/search.svg';
import userIcon from '../../images/icons/user.svg';

import './style.css';

const Header = ({ title, hasSearchBar }) => {
  // const [inputValue, setInputValue] = useState('');
  const [showInputSearch, setShowInputSearch] = useState(false);

  return (
    <header>
      <Link to="/perfil">
        <img
          className="user-button"
          data-testid="profile-top-btn"
          src={ userIcon }
          alt="Perfil"
        />
      </Link>
      <h1 className="page-title" data-testid="page-title">
        {title}
      </h1>
      <div>
        {showInputSearch && <SearchBar />}
        <button
          type="button"
          className="search-icon"
          onClick={ () => {
            setShowInputSearch(!showInputSearch);
          } }
          style={
            hasSearchBar ? { visibility: 'visible' } : { visibility: 'hidden' }
          }
        >
          <img data-testid="search-top-btn" src={ searchIcon } alt="Pesquisar" />
        </button>
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
