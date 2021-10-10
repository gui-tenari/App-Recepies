import {
  getRecipes,
  getRecipesByIngredient,
  getRecipesByName,
  getRecipesByFirstLetter,
  getRecipeCategories,
  getRecipesByCategory,
} from '../../services/recipesAPI';

const RECIPES_NOT_FOUND = 'Sinto muito, não encontramos nenhuma'
+ ' receita para esses filtros.';

const DRINKS_ACTIONS = {
  SET_DRINKS: 'SET_DRINKS',
  SET_FILTERED_DRINKS: 'SET_FILTERED_DRINKS',
  SET_DRINK_CATEGORIES: 'SET_DRINK_CATEGORIES',
  REQUEST_DRINKS_API: 'REQUEST_DRINKS_API',
  FAILED_DRINKS_REQUEST: 'FAILED_DRINKS_REQUEST',
};

const setDrinks = (drinks) => ({
  type: DRINKS_ACTIONS.SET_DRINKS,
  payload: drinks,
});

export const setFilteredDrinks = (drinks, filterInfo) => ({
  type: DRINKS_ACTIONS.SET_FILTERED_DRINKS,
  payload: { drinks, filterInfo },
});

const setCategories = (categories) => ({
  type: DRINKS_ACTIONS.SET_DRINK_CATEGORIES,
  payload: categories,
});

const requestApi = () => ({ type: DRINKS_ACTIONS.REQUEST_DRINKS_API });

const failedRequest = (error) => ({
  type: DRINKS_ACTIONS.FAILED_DRINKS_REQUEST,
  payload: error,
});

export const fetchDrinksThunk = () => async (dispatch, getState) => {
  const {
    drinks: { filteredDrinks },
  } = getState();

  if (filteredDrinks.length === 0) {
    dispatch(requestApi());

    try {
      const drinks = await getRecipes('drinks');

      dispatch(setDrinks(drinks));
      dispatch(setFilteredDrinks(drinks, { term: '', type: '' }));
    } catch (error) {
      dispatch(failedRequest(error.message));
    }
  }
};

export const setDrinksByIngredient = (type, search) => async (dispatch) => {
  dispatch(requestApi());

  try {
    const drinks = await getRecipesByIngredient(type, search);

    dispatch(setFilteredDrinks(drinks, { term: search, type: 'query' }));
  } catch (error) {
    global.alert(RECIPES_NOT_FOUND);
    dispatch(failedRequest(error.message));
  }
};

export const setDrinksByName = (type, search) => async (dispatch) => {
  dispatch(requestApi());

  try {
    const drinks = await getRecipesByName(type, search);

    dispatch(setFilteredDrinks(drinks, { term: search, type: 'query' }));
  } catch (error) {
    global.alert(RECIPES_NOT_FOUND);
    dispatch(failedRequest(error.message));
  }
};

export const setDrinksByFirstLetter = (type, search) => async (dispatch) => {
  dispatch(requestApi());

  try {
    const drinks = await getRecipesByFirstLetter(type, search);

    dispatch(setFilteredDrinks(drinks, { term: search, type: 'query' }));
  } catch (error) {
    global.alert(RECIPES_NOT_FOUND);
    dispatch(failedRequest(error.message));
  }
};

export const setDrinksByCategory = (category) => async (dispatch) => {
  dispatch(requestApi());

  try {
    const drinks = await getRecipesByCategory('drinks', category);

    dispatch(setFilteredDrinks(drinks, { term: category, type: 'category' }));
  } catch (error) {
    dispatch(failedRequest(error.message));
  }
};

export const setDrinkCategories = () => async (dispatch, getState) => {
  // dispatch(requestApi());

  try {
    const { drinks } = getState();
    const { categories } = drinks;

    if (!categories.length) {
      const retrievedCategories = await getRecipeCategories('drinks');

      dispatch(setCategories(retrievedCategories));
    }
  } catch (error) {
    dispatch(failedRequest(error.message));
  }
};

export default DRINKS_ACTIONS;
