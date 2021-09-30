import React, { useState, useEffect } from 'react';

import Header from '../../components/Header';
import ShareButton from '../../components/ShareButton';

const FinishedRecipes = () => {
  const doneRecipes = localStorage.getItem('doneRecipes');
  const doneRecipesParse = JSON.parse(doneRecipes);
  const [recipes] = useState(doneRecipesParse);
  const [filteredRecipes, setFilteredRecipes] = useState(doneRecipesParse);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    if (filter === '') {
      setFilteredRecipes(recipes);
    } else {
      setFilteredRecipes(recipes.filter((recipe) => recipe.type === filter));
    }
  }, [filter, recipes]);

  return (
    <div>
      <Header title="Receitas Feitas" />
      <button
        onClick={ () => setFilter('') }
        type="button"
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        onClick={ () => setFilter('comida') }
        type="button"
        data-testid="filter-by-food-btn"
      >
        Food
      </button>
      <button
        onClick={ () => setFilter('bebida') }
        type="button"
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
      {filteredRecipes.map((recipe, index) => (
        <div key={ recipe.id }>
          <img
            data-testid={ `${index}-horizontal-image` }
            src={ recipe.image }
            alt={ recipe.name }
          />
          <p data-testid={ `${index}-horizontal-top-text` }>
            {recipe.type === 'comida'
              ? `${recipe.area} - ${recipe.category}`
              : recipe.alcoholicOrNot}
          </p>
          <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
          <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
          <ShareButton
            type={ `${recipe.type}s` }
            id={ recipe.id }
            testId={ `${index}-horizontal-share-btn` }
          />
          {recipe.tags.map((tag) => (
            <span key={ tag } data-testid={ `${index}-${tag}-horizontal-tag` }>
              {tag}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
};

export default FinishedRecipes;
