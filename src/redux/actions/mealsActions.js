import { getMeals } from '../../services/recipesAPI';

const MEALS_ACTIONS = {
  SET_MEALS: 'SET_MEALS',
  SET_FAVORITE: 'SET_FAVORITE',
  REQUEST_API: 'REQUEST_API',
  FAILED_REQUEST: 'FAILED_REQUEST',
};

const setMeals = (meals) => ({ type: MEALS_ACTIONS.SET_MEALS, payload: meals });

const requestApi = () => ({ type: MEALS_ACTIONS.REQUEST_API });

const failedRequest = (error) => ({ type: MEALS_ACTIONS.FAILED_REQUEST, payload: error });

export const fetchMealsThunk = () => async (dispatch) => {
  dispatch(requestApi());

  try {
    const meals = await getMeals();

    dispatch(setMeals(meals));
  } catch (error) {
    dispatch(failedRequest(error.message));
  }
};

export default MEALS_ACTIONS;
