import DONE_RECIPES_ACTIONS from '../actions/doneRecipesActions';

const INITIAL_STATE = [];

export const getDoneRecipes = () => {
  const doneRecipes = localStorage.getItem('doneRecipes');

  return doneRecipes ? JSON.parse(doneRecipes) : INITIAL_STATE;
};

const doneRecipesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case DONE_RECIPES_ACTIONS.ADD_DONE_RECIPE:
    return [...state, action.payload];
  default:
    return state;
  }
};

export default doneRecipesReducer;
