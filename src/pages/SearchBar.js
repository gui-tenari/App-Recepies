import React, { useState } from 'react';
import * as MealsApi from '../services/MealsApi';
import * as DrinksApi from '../services/DrinksApi';

function SearchBar() {
  const [searchInput, setSearchInput] = useState('');
  const [pageComidas] = useState('comidas');
  const [pageBebidas] = useState('bebidas');
  const [radio, setRadio] = useState('');
  const firstLetterSearch = 'first-letter-search';

  const meals = async () => {
    let results = '';
    if (radio === firstLetterSearch && searchInput.length > 1) {
      global.alert('Sua busca deve conter somente 1 (um) caracter');
    }
    if (radio === 'ingredient-search') {
      results = await MealsApi.fetchMealsByIngredient(searchInput);
    }
    if (radio === 'name-search') {
      results = await MealsApi.fetchMealsByName(searchInput);
    }
    if (radio === firstLetterSearch) {
      results = await MealsApi.fetchMealsByFirstLetter(searchInput);
    }
  };

  const drinks = async () => {
    let results = '';
    if (radio === firstLetterSearch && searchInput.length > 1) {
      global.alert('Sua busca deve conter somente 1 (um) caracter');
    }
    if (radio === 'ingredient-search') {
      results = await DrinksApi.fetchDrinksByIngredient(searchInput);
    }
    if (radio === 'name-search') {
      results = await DrinksApi.fetchDrinksByName(searchInput);
    }
    if (radio === firstLetterSearch) {
      results = await DrinksApi.fetchDrinksByFirstLetter(searchInput);
    }

    global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  };

  const handleInputText = ({ target: { value } }) => {
    setSearchInput(value);
  };

  const handleChange = ({ target: { id } }) => {
    setRadio(id);
  };

  const handleClick = () => {
    if (pageComidas === 'comidas') {
      meals();
    }
    if (pageBebidas === 'bebidas') {
      drinks();
    }
  };

  return (
    <div>
      <input
        id="search-input"
        type="text"
        data-testid="search-input"
        className="input-field-search"
        name="search-input"
        value={ searchInput }
        placeholder="Buscar"
        onChange={ handleInputText }
      />
      <label htmlFor="ingredient-search-radio">
        ingredientes
        <input
          id="ingredient-search"
          type="radio"
          data-testid="ingredient-search-radio"
          name="radio-filter"
          onChange={ handleChange }
        />
      </label>
      <label htmlFor="name-search-radio">
        Nome
        <input
          id="name-search"
          type="radio"
          data-testid="name-search-radio"
          name="radio-filter"
          onChange={ handleChange }
        />
      </label>
      <label htmlFor="first-letter-search-radio">
        Primeira Letra
        <input
          id="first-letter-search"
          type="radio"
          data-testid="first-letter-search-radio"
          name="radio-filter"
          onChange={ handleChange }
        />
      </label>
      <button
        type="button"
        className="button-search"
        data-testid="exec-search-btn"
        onClick={ handleClick }
      >
        Buscar
      </button>
    </div>
  );
}

export default SearchBar;
