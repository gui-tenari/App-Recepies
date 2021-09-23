import {
  getRecipes,
  getRecipesByIngredient,
  getRecipesByName,
  getRecipesByFirstLetter,
} from '../../services/recipesAPI';

const RECIPES_NOT_FOUND = 'Sinto muito, não encontramos nenhuma'
  + ' receita para esses filtros.';

const MEALS_ACTIONS = {
  SET_MEALS: 'SET_MEALS',
  SET_FILTERED_MEALS: 'SET_FILTERED_MEALS',
  SET_FAVORITE: 'SET_FAVORITE',
  REQUEST_API: 'REQUEST_API',
  FAILED_REQUEST: 'FAILED_REQUEST',
};

const setMeals = (meals) => ({ type: MEALS_ACTIONS.SET_MEALS, payload: meals });

const setFilteredMeals = (meals) => ({
  type: MEALS_ACTIONS.SET_FILTERED_MEALS,
  payload: meals,
});

const requestApi = () => ({ type: MEALS_ACTIONS.REQUEST_API });

const failedRequest = (error) => ({
  type: MEALS_ACTIONS.FAILED_REQUEST,
  payload: error,
});

export const fetchMealsThunk = () => async (dispatch) => {
  dispatch(requestApi());

  try {
    const meals = await getRecipes('meals');

    dispatch(setMeals(meals));
    dispatch(setFilteredMeals(meals));
  } catch (error) {
    dispatch(failedRequest(error.message));
  }
};

export const setMealsByIngredient = (type, search) => async (dispatch) => {
  dispatch(requestApi());

  try {
    const meals = await getRecipesByIngredient(type, search);

    dispatch(setFilteredMeals(meals));
  } catch (error) {
    global.alert(RECIPES_NOT_FOUND);
    dispatch(failedRequest(error.message));
  }
};

export const setMealsByName = (type, search) => async (dispatch) => {
  dispatch(requestApi());

  try {
    const meals = await getRecipesByName(type, search);

    dispatch(setFilteredMeals(meals));
  } catch (error) {
    global.alert(RECIPES_NOT_FOUND);
    dispatch(failedRequest(error.message));
  }
};

export const setMealsByFirstLetter = (type, search) => async (dispatch) => {
  dispatch(requestApi());

  try {
    const meals = await getRecipesByFirstLetter(type, search);

    dispatch(setFilteredMeals(meals));
  } catch (error) {
    global.alert(RECIPES_NOT_FOUND);
    dispatch(failedRequest(error.message));
  }
};

export default MEALS_ACTIONS;
