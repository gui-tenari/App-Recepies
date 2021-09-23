import DRINKS_ACTIONS from '../actions/drinksActions';

const INITIAL_STATE = {
  drinkList: [],
  favoriteDrinks: [],
  isFetching: false,
  error: '',
};

const drinksReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case DRINKS_ACTIONS.SET_DRINKS:
    return { ...state, isFetching: false, error: '', drinkList: action.payload };
  case DRINKS_ACTIONS.REQUEST_API:
    return { ...state, isFetching: true };
  case DRINKS_ACTIONS.FAILED_REQUEST:
    return { ...state, isFetching: false, error: action.payload };
  default:
    return state;
  }
};

export default drinksReducer;
