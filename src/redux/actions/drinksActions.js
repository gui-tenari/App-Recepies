import { getDinks } from '../../services/recipesAPI';

const DRINKS_ACTIONS = {
  SET_DRINKS: 'SET_DRINKS',
  REQUEST_API: 'REQUEST_API',
  FAILED_REQUEST: 'FAILED_REQUEST',
};

const setDrinks = (drinks) => ({
  type: DRINKS_ACTIONS.SET_DRINKS,
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
    const drinks = await getDinks();

    dispatch(setDrinks(drinks));
  } catch (error) {
    dispatch(failedRequest(error.message));
  }
};

export default DRINKS_ACTIONS;
