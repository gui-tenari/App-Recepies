import { getFavoriteRecipes } from '../redux/reducers/favoriteRecipesReducer';

export const loadState = () => {
  const favoriteRecipes = getFavoriteRecipes();

  return {
    favoriteRecipes,
  };
};

export const saveState = (state) => {
  localStorage.setItem('favoriteRecipes', JSON.stringify(state.favoriteRecipes));
};
