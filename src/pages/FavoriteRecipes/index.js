import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Header from '../../components/Header';
import CategoryButton from '../../components/CategoryButton';
import FavoriteRecipeCard from '../../components/FavoriteRecipeCard';

const FavoriteRecipes = () => {
  const { favoriteRecipes } = useSelector((state) => state);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    if (filter) {
      setFilteredRecipes(favoriteRecipes.filter((recipe) => recipe.type === filter));
    } else {
      setFilteredRecipes(favoriteRecipes);
    }
  }, [favoriteRecipes, filter]);

  return (
    <div>
      <Header title="Receitas Favoritas" />
      <div className="filters">
        <CategoryButton
          category="All"
          handleFilterClick={ () => setFilter('') }
          testId="filter-by-all-btn"
        />
        <CategoryButton
          category="Food"
          handleFilterClick={ () => setFilter('comida') }
          testId="filter-by-food-btn"
        />
        <CategoryButton
          category="Drinks"
          handleFilterClick={ () => setFilter('bebida') }
          testId="filter-by-drink-btn"
        />
      </div>

      <div className="recipes-list">
        {filteredRecipes.map((recipe, index) => (
          <FavoriteRecipeCard
            key={ recipe.id }
            recipe={ recipe }
            index={ index }
          />
        ))}
      </div>
    </div>
  );
};

export default FavoriteRecipes;
