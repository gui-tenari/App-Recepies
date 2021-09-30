const getFavoriteRecipes = () => {
  const favoriteRecipes = localStorage.getItem('favoriteRecipes');

  return favoriteRecipes ? JSON.parse(favoriteRecipes) : [];
};

export const loadState = () => {
  const favoriteRecipes = getFavoriteRecipes();

  return {
    favoriteRecipes,
  };
};

export const saveState = (state) => {
  localStorage.setItem('favoriteRecipes', JSON.stringify(state.favoriteRecipes));
};
