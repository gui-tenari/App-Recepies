import {
  getRecipes,
  getRecipesByIngredient,
  getRecipesByName,
  getRecipesByFirstLetter,
  getRecipesByCategory,
  getRecipeCategories,
  getMealsByArea,
} from '../../services/recipesAPI';

const RECIPES_NOT_FOUND = 'Sinto muito, não encontramos nenhuma'
+ ' receita para esses filtros.';

const MEALS_ACTIONS = {
  SET_MEALS: 'SET_MEALS',
  SET_FILTERED_MEALS: 'SET_FILTERED_MEALS',
  SET_MEAL_CATEGORIES: 'SET_MEAL_CATEGORIES',
  SET_FAVORITE: 'SET_FAVORITE',
  REQUEST_MEALS_API: 'REQUEST_MEALS_API',
  FAILED_MEALS_REQUEST: 'FAILED_MEALS_REQUEST',
};

const setMeals = (meals) => ({ type: MEALS_ACTIONS.SET_MEALS, payload: meals });

export const setFilteredMeals = (meals, filterType) => ({
  type: MEALS_ACTIONS.SET_FILTERED_MEALS,
  payload: { meals, filterType },
});

const setCategories = (categories) => ({
  type: MEALS_ACTIONS.SET_MEAL_CATEGORIES,
  payload: categories,
});

const requestApi = () => ({ type: MEALS_ACTIONS.REQUEST_MEALS_API });

const failedRequest = (error) => ({
  type: MEALS_ACTIONS.FAILED_MEALS_REQUEST,
  payload: error,
});

export const fetchMealsThunk = () => async (dispatch, getState) => {
  const {
    meals: { filteredMeals },
  } = getState();

  if (filteredMeals.length === 0) {
    dispatch(requestApi());

    try {
      const meals = await getRecipes('meals');

      dispatch(setMeals(meals));
      dispatch(setFilteredMeals(meals, 'query'));
    } catch (error) {
      dispatch(failedRequest(error.message));
    }
  }
};

export const setMealsByIngredient = (type, search) => async (dispatch) => {
  dispatch(requestApi());

  try {
    const meals = await getRecipesByIngredient(type, search);

    dispatch(setFilteredMeals(meals, 'query'));
  } catch (error) {
    global.alert(RECIPES_NOT_FOUND);
    dispatch(failedRequest(error.message));
  }
};

export const setMealsByName = (type, search) => async (dispatch) => {
  dispatch(requestApi());

  try {
    const meals = await getRecipesByName(type, search);

    dispatch(setFilteredMeals(meals, 'query'));
  } catch (error) {
    global.alert(RECIPES_NOT_FOUND);
    dispatch(failedRequest(error.message));
  }
};

export const setMealsByFirstLetter = (type, search) => async (dispatch) => {
  dispatch(requestApi());

  try {
    const meals = await getRecipesByFirstLetter(type, search);

    dispatch(setFilteredMeals(meals, 'query'));
  } catch (error) {
    global.alert(RECIPES_NOT_FOUND);
    dispatch(failedRequest(error.message));
  }
};

export const setMealsByCategory = (category) => async (dispatch) => {
  dispatch(requestApi());

  try {
    const meals = await getRecipesByCategory('meals', category);

    dispatch(setFilteredMeals(meals, 'category'));
  } catch (error) {
    dispatch(failedRequest(error.message));
  }
};

export const setMealsByArea = (area) => async (dispatch) => {
  dispatch(requestApi());

  try {
    const meals = await getMealsByArea(area);

    dispatch(setFilteredMeals(meals, 'query'));
  } catch (error) {
    dispatch(failedRequest(error.message));
  }
};

export const setMealCategories = () => async (dispatch, getState) => {
  dispatch(requestApi());

  try {
    const { meals } = getState();
    const { categories } = meals;

    if (!categories.length) {
      const retrievedCategories = await getRecipeCategories('meals');

      dispatch(setCategories(retrievedCategories));
    }
  } catch (error) {
    dispatch(failedRequest(error.message));
  }
};

export default MEALS_ACTIONS;
