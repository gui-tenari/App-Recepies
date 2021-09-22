import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';

const [inputValue, setInputValue] = useState('');
const [showInputSearch, setShowInputSearch] = useState(false);

const Header = () => (
  <header>
    <Link data-testid="profile-top-btn" to="/profile">
      <img src={ profileIcon } alt="Perfil" />
    </Link>
    <div>
      <h1 data-testid="page-title">Comidas</h1>
    </div>
    <div>
      { showInputSearch && (
        <input
          type="text"
          value={ inputValue }
          onChange={ setInputValue }
        />) }
      <button
        type="button"
        data-testid="search-top-btn"
        onClick={ () => { setShowInputSearch(!showInputSearch); } }
      >
        <img src={ searchIcon } alt="Pesquisar" />
      </button>
    </div>
  </header>
);

export default Header;
