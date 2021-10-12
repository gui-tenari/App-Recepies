import DRINKS_ACTIONS from '../actions/drinksActions';

const INITIAL_STATE = {
  drinkList: [],
  filteredDrinks: [],
  categories: [],
  filterInfo: {
    term: '',
    type: '',
  },
  isFetching: true,
  error: '',
};

const drinksReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case DRINKS_ACTIONS.SET_DRINKS:
    return {
      ...state,
      isFetching: false,
      error: '',
      drinkList: action.payload,
    };
  case DRINKS_ACTIONS.SET_FILTERED_DRINKS:
    return {
      ...state,
      isFetching: false,
      error: '',
      filteredDrinks: action.payload.drinks,
      filterInfo: action.payload.filterInfo,
    };
  case DRINKS_ACTIONS.SET_DRINK_CATEGORIES:
    return {
      ...state,
      isFetching: false,
      error: '',
      categories: action.payload,
    };
  case DRINKS_ACTIONS.REQUEST_DRINKS_API:
    return { ...state, isFetching: true };
  case DRINKS_ACTIONS.FAILED_DRINKS_REQUEST:
    return { ...state, isFetching: false, error: action.payload };
  default:
    return state;
  }
};

export default drinksReducer;
