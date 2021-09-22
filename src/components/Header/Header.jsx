import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';


const Header = () => (
  const [inputValue, setInputValue] = useState('');
  const [showInputSearch, setShowInputSearch] = useState(false);

  <header>
    <Link to="/profile">
      <img data-testid="profile-top-btn" src={ profileIcon } alt="Perfil" />
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
        onClick={ () => { setShowInputSearch(!showInputSearch); } }
      >
        <img data-testid="search-top-btn" src={ searchIcon } alt="Pesquisar" />
      </button>
    </div>
  </header>
);

export default Header;
