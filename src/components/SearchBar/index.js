import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import {
  setDrinksByIngredient,
  setDrinksByName,
  setDrinksByFirstLetter,
} from '../../redux/actions/drinksActions';

import {
  setMealsByIngredient,
  setMealsByName,
  setMealsByFirstLetter,
} from '../../redux/actions/mealsActions';

const typeTable = {
  '/comidas': 'meals',
  '/bebidas': 'drinks',
};

function SearchBar() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const [searchInput, setSearchInput] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');

  const thunkTable = {
    meals: {
      ingredients: () => dispatch(setMealsByIngredient('meals', searchInput)),
      name: () => dispatch(setMealsByName('meals', searchInput)),
      firstLetter: () => dispatch(setMealsByFirstLetter('meals', searchInput)),
    },
    drinks: {
      ingredients: () => dispatch(setDrinksByIngredient('drinks', searchInput)),
      name: () => dispatch(setDrinksByName('drinks', searchInput)),
      firstLetter: () => dispatch(setDrinksByFirstLetter('drinks', searchInput)),
    },
  };

  const filterTable = {
    ingredients: (recipeType) => {
      thunkTable[recipeType].ingredients();
    },
    name: (recipeType) => {
      thunkTable[recipeType].name();
    },
    firstLetter: async (recipeType) => {
      if (searchInput.length === 1) {
        thunkTable[recipeType].firstLetter();
      } else {
        global.alert('Sua busca deve conter somente 1 (um) caracter');
      }
    },
  };

  const handleInputText = ({ target: { value } }) => {
    setSearchInput(value);
  };

  const handleChange = ({ target: { value } }) => {
    setSelectedFilter(value);
  };

  const handleClick = async () => {
    const recipeType = typeTable[pathname];

    filterTable[selectedFilter](recipeType);
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

      <label htmlFor="ingredient-search">
        <input
          id="ingredient-search"
          type="radio"
          data-testid="ingredient-search-radio"
          value="ingredients"
          checked={ selectedFilter === 'ingredients' }
          onChange={ handleChange }
        />
        ingredientes
      </label>
      <label htmlFor="name-search">
        <input
          id="name-search"
          type="radio"
          data-testid="name-search-radio"
          value="name"
          checked={ selectedFilter === 'name' }
          onChange={ handleChange }
        />
        Nome
      </label>
      <label htmlFor="first-letter-search">
        <input
          id="first-letter-search"
          type="radio"
          data-testid="first-letter-search-radio"
          value="firstLetter"
          checked={ selectedFilter === 'firstLetter' }
          onChange={ handleChange }
        />
        Primeira Letra
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
