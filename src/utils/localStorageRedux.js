import { getFavoriteRecipes } from '../redux/reducers/favoriteRecipesReducer';
import { getInProgressRecipes } from '../redux/reducers/inProgressRecipesReducer';
import { getDoneRecipes } from '../redux/reducers/doneRecipesReducer';

export const loadState = () => {
  const favoriteRecipes = getFavoriteRecipes();
  const inProgressRecipes = getInProgressRecipes();
  const doneRecipes = getDoneRecipes();

  return {
    favoriteRecipes,
    inProgressRecipes,
    doneRecipes,
  };
};

export const saveState = (state) => {
  localStorage.setItem('favoriteRecipes', JSON.stringify(state.favoriteRecipes));
  localStorage.setItem('inProgressRecipes', JSON.stringify(state.inProgressRecipes));
  localStorage.setItem('doneRecipes', JSON.stringify(state.doneRecipes));
};
