import { getFavoriteRecipes } from '../redux/reducers/favoriteRecipesReducer';
import { getInProgressRecipes } from '../redux/reducers/inProgressRecipesReducer';

export const loadState = () => {
  const favoriteRecipes = getFavoriteRecipes();
  const inProgressRecipes = getInProgressRecipes();

  return {
    favoriteRecipes,
    inProgressRecipes,
  };
};

export const saveState = (state) => {
  localStorage.setItem('favoriteRecipes', JSON.stringify(state.favoriteRecipes));
  localStorage.setItem('inProgressRecipes', JSON.stringify(state.inProgressRecipes));
};
