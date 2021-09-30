import React, { useState } from 'react';

import Header from '../../components/Header';
import shareIcon from '../../images/shareIcon.svg';

const FinishedRecipes = () => {
  const doneRecipes = localStorage.getItem('doneRecipes');
  const doneRecipesParse = JSON.parse(doneRecipes);
  const [recipes] = useState(doneRecipesParse);
  return (
    <div>
      <Header title="Receitas Feitas" />
      <button type="button" data-testid="filter-by-all-btn">
        All
      </button>
      <button type="button" data-testid="filter-by-food-btn">
        Food
      </button>
      <button type="button" data-testid="filter-by-drink-btn">
        Drinks
      </button>
      {recipes.map((recipe, index) => (
        <div key={ recipe.id }>
          <img
            data-testid={ `${index}-horizontal-image` }
            src={ recipe.imagem }
            alt={ recipe.name }
          />
          <p data-testid={ `${index}-horizontal-top-text` }>{recipe.category}</p>
          <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
          <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
          <button type="button" data-testid={ `${index}-horizontal-share-btn` }>
            <img src={ shareIcon } alt="share" />
          </button>
          { recipe.tags.map((tag) => (
            <span
              key={ tag }
              data-testid={ `${index}-${tag}-horizontal-tag` }
            >
              {tag}
            </span>
          )) }
        </div>
      ))}
    </div>
  );
};

export default FinishedRecipes;
