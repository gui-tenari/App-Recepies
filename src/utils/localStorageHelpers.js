export const getFavoriteRecipes = () => {
  const favoriteRecipes = localStorage.getItem('favoriteRecipes');

  return favoriteRecipes ? JSON.parse(favoriteRecipes) : [];
};

export const setFavoriteRecipes = (recipes) => {
  localStorage.setItem('favoriteRecipes', JSON.stringify(recipes));
};

export const toggleFavoriteRecipe = (recipe, type, isFavorite) => {
  const favoriteRecipes = getFavoriteRecipes();

  if (isFavorite) {
    const newFavoriteRecipes = favoriteRecipes.filter(
      (favoriteRecipe) => favoriteRecipe.id !== recipe.id,
    );

    setFavoriteRecipes(newFavoriteRecipes);
  } else {
    const newFavoriteRecipes = [...favoriteRecipes, recipe];

    setFavoriteRecipes(newFavoriteRecipes);
  }
};

export const getInProgressRecipes = () => {
  const inProgressRecipes = localStorage.getItem('inProgressRecipes');

  return inProgressRecipes ? JSON.parse(inProgressRecipes) : {
    meals: {},
    cocktails: {},
  };
};

export const setInProgressRecipes = (recipes, type, id) => {
  const inProgressRecipes = getInProgressRecipes();

  inProgressRecipes[type][id] = recipes;

  localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
};
