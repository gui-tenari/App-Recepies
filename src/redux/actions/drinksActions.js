import {
  getRecipes,
  getRecipesByIngredient,
  getRecipesByName,
  getRecipesByFirstLetter,
} from '../../services/recipesAPI';

const RECIPES_NOT_FOUND = 'Sinto muito, não encontramos nenhuma'
  + ' receita para esses filtros.';

const DRINKS_ACTIONS = {
  SET_DRINKS: 'SET_DRINKS',
  SET_FILTERED_DRINKS: 'SET_FILTERED_DRINKS',
  REQUEST_API: 'REQUEST_API',
  FAILED_REQUEST: 'FAILED_REQUEST',
};

const setDrinks = (drinks) => ({
  type: DRINKS_ACTIONS.SET_DRINKS,
  payload: drinks,
});

const setFilteredDrinks = (drinks) => ({
  type: DRINKS_ACTIONS.SET_FILTERED_DRINKS,
  payload: drinks,
});

const requestApi = () => ({ type: DRINKS_ACTIONS.REQUEST_API });

const failedRequest = (error) => ({
  type: DRINKS_ACTIONS.FAILED_REQUEST,
  payload: error,
});

export const fetchDrinksThunk = () => async (dispatch) => {
  dispatch(requestApi());

  try {
    const drinks = await getRecipes('drinks');

    dispatch(setDrinks(drinks));
    dispatch(setFilteredDrinks(drinks));
  } catch (error) {
    dispatch(failedRequest(error.message));
  }
};

export const setDrinksByIngredient = (type, search) => async (dispatch) => {
  dispatch(requestApi());

  try {
    const drinks = await getRecipesByIngredient(type, search);

    dispatch(setFilteredDrinks(drinks));
  } catch (error) {
    global.alert(RECIPES_NOT_FOUND);
    dispatch(failedRequest(error.message));
  }
};

export const setDrinksByName = (type, search) => async (dispatch) => {
  dispatch(requestApi());

  console.log(type, search);
  try {
    const drinks = await getRecipesByName(type, search);

    dispatch(setFilteredDrinks(drinks));
  } catch (error) {
    global.alert(RECIPES_NOT_FOUND);
    dispatch(failedRequest(error.message));
  }
};

export const setDrinksByFirstLetter = (type, search) => async (dispatch) => {
  dispatch(requestApi());

  try {
    const drinks = await getRecipesByFirstLetter(type, search);

    dispatch(setFilteredDrinks(drinks));
  } catch (error) {
    global.alert(RECIPES_NOT_FOUND);
    dispatch(failedRequest(error.message));
  }
};

export default DRINKS_ACTIONS;
