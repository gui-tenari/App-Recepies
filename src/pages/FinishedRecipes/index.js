import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Header from '../../components/Header';
import DoneRecipeCard from '../../components/DoneRecipeCard';
import CategoryButton from '../../components/CategoryButton';

import './style.css';

const filterTable = {
  All: '',
  Food: 'comida',
  Drinks: 'bebida',
};

const FinishedRecipes = () => {
  const { doneRecipes } = useSelector((state) => state);

  const [filteredRecipes, setFilteredRecipes] = useState(doneRecipes);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    if (filterTable[filter] === '') {
      setFilteredRecipes(doneRecipes);
    } else {
      setFilteredRecipes(
        doneRecipes.filter((recipe) => recipe.type === filterTable[filter]),
      );
    }
  }, [filter, doneRecipes]);

  return (
    <>
      <Header title="Receitas Feitas" />
      <div className="finished-recipes">
        <div className="filter-section">
          <CategoryButton
            category="All"
            handleFilterClick={ (category) => {
              setFilter(category);
            } }
            testId="filter-by-all-btn"
            activeFilter={ filter }
          />
          <CategoryButton
            category="Food"
            handleFilterClick={ (category) => {
              setFilter(category);
            } }
            testId="filter-by-food-btn"
            activeFilter={ filter }
          />
          <CategoryButton
            category="Drinks"
            handleFilterClick={ (category) => {
              setFilter(category);
            } }
            testId="filter-by-drink-btn"
            activeFilter={ filter }
          />
        </div>
        {filteredRecipes
          && filteredRecipes.map((recipe, index) => (
            <DoneRecipeCard key={ index } recipe={ recipe } index={ index } />
          ))}
      </div>
    </>
  );
};

export default FinishedRecipes;
