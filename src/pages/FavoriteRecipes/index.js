import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Header from '../../components/Header';
import CategoryButton from '../../components/CategoryButton';
import FavoriteRecipeCard from '../../components/FavoriteRecipeCard';

const filterTable = {
  All: '',
  Food: 'comida',
  Drinks: 'bebida',
};

const FavoriteRecipes = () => {
  const { favoriteRecipes } = useSelector((state) => state);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    if (filterTable[filter]) {
      setFilteredRecipes(
        favoriteRecipes.filter((recipe) => recipe.type === filterTable[filter]),
      );
    } else {
      setFilteredRecipes(favoriteRecipes);
    }
  }, [favoriteRecipes, filter]);

  return (
    <>
      <Header title="Receitas Favoritas" />
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

        {filteredRecipes.map((recipe, index) => (
          <FavoriteRecipeCard key={ recipe.id } recipe={ recipe } index={ index } />
        ))}
      </div>
    </>
  );
};

export default FavoriteRecipes;
