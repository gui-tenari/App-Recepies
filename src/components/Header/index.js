import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import SearchBar from '../SearchBar';

const Header = ({ title, hasSearchBar }) => {
  // const [inputValue, setInputValue] = useState('');
  const [showInputSearch, setShowInputSearch] = useState(false);

  return (
    <header>
      <Link to="/perfil">
        <img data-testid="profile-top-btn" src={ profileIcon } alt="Perfil" />
      </Link>
      <div>
        <h1 data-testid="page-title">{title}</h1>
      </div>
      {hasSearchBar && (
        <div>
          {showInputSearch && <SearchBar />}
          <button
            type="button"
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
        </div>
      )}
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
