import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Input from '../Input';
import Button from '../Button';

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

import './style.css';

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

  const handleChange = ({ target: { value } }) => {
    setSelectedFilter(value);
  };

  const handleClick = async () => {
    const recipeType = typeTable[pathname];

    filterTable[selectedFilter](recipeType);
  };

  return (
    <div className="search-bar">
      <Input
        type="text"
        placeholder="Buscar Receita"
        value={ searchInput }
        onChange={ ({ target }) => setSearchInput(target.value) }
        className="search-input"
      />

      <div className="search-types">
        <label htmlFor="ingredient-search">
          <input
            id="ingredient-search"
            type="radio"
            data-testid="ingredient-search-radio"
            value="ingredients"
            checked={ selectedFilter === 'ingredients' }
            onChange={ handleChange }
          />
          <span className="radio-control" />
          Ingredientes
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
          <span className="radio-control" />
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
          <span className="radio-control" />
          Primeira Letra
        </label>
      </div>

      <Button
        type="button"
        onClick={ handleClick }
        text="Buscar"
        className="search-button"
      />
    </div>
  );
}

export default SearchBar;
