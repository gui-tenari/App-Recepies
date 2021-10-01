import IN_PROGRESS_RECIPES_ACTIONS from '../actions/inProgressRecipesActions';

const INITIAL_STATE = {
  meals: {},
  cocktails: {},
};

export const getInProgressRecipes = () => {
  const inProgressRecipes = localStorage.getItem('inProgressRecipes');

  return inProgressRecipes ? JSON.parse(inProgressRecipes) : INITIAL_STATE;
};

const inProgressRecipesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case IN_PROGRESS_RECIPES_ACTIONS.SET_IN_PROGRESS_MEAL:
    return {
      ...state,
      meals: {
        ...state.meals,
        ...action.payload,
      },
    };
  case IN_PROGRESS_RECIPES_ACTIONS.SET_IN_PROGRESS_COCKTAIL:
    return {
      ...state,
      cocktails: {
        ...state.cocktails,
        ...action.payload,
      },
    };
  default:
    return state;
  }
};

export default inProgressRecipesReducer;
