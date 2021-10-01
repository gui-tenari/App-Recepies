import React, { useEffect, useState } from 'react';

import Header from '../../components/Header';
import CategoryButton from '../../components/CategoryButton';
import FavoriteRecipeCard from '../../components/FavoriteRecipeCard';

import { getFavoriteRecipes } from '../../utils/localStorageHelpers';

const FavoriteRecipes = () => {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  useEffect(() => {
    setFavoriteRecipes(getFavoriteRecipes());
  }, []);

  const handleFilterClick = () => {};
  return (
    <div>
      <Header title="Receitas Favoritas" />
      <div className="filters">
        <CategoryButton
          category="All"
          handleFilterClick={ handleFilterClick }
          testId="filter-by-all-btn"
        />
        <CategoryButton
          category="Food"
          handleFilterClick={ handleFilterClick }
          testId="filter-by-food-btn"
        />
        <CategoryButton
          category="Drinks"
          handleFilterClick={ handleFilterClick }
          testId="filter-by-drink-btn"
        />
      </div>

      <div className="recipes-list">
        {favoriteRecipes.map((recipe, index) => (
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
