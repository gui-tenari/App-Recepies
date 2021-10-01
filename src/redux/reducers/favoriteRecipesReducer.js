import FAVORITE_RECIPES_ACTIONS from '../actions/favoriteRecipesActions';

const INITIAL_STATE = [];

export const getFavoriteRecipes = () => {
  const favoriteRecipes = localStorage.getItem('favoriteRecipes');

  return favoriteRecipes ? JSON.parse(favoriteRecipes) : INITIAL_STATE;
};

const favoriteRecipesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FAVORITE_RECIPES_ACTIONS.ADD_FAVORITE_RECIPE:
    return [...state, action.payload];
  case FAVORITE_RECIPES_ACTIONS.REMOVE_FAVORITE_RECIPE:
    return state.filter((recipe) => recipe.id !== action.payload);
  default:
    return state;
  }
};

export default favoriteRecipesReducer;
