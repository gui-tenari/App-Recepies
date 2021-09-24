import DRINKS_ACTIONS from '../actions/drinksActions';

const INITIAL_STATE = {
  drinkList: [],
  filteredDrinks: [],
  categories: [],
  favoriteDrinks: [],
  filterType: '',
  isFetching: false,
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
      filterType: action.payload.filterType,
    };
  case DRINKS_ACTIONS.SET_DRINK_CATEGORIES:
    return {
      ...state,
      isFetching: false,
      error: '',
      categories: action.payload,
    };
  case DRINKS_ACTIONS.REQUEST_API:
    return { ...state, isFetching: true };
  case DRINKS_ACTIONS.FAILED_REQUEST:
    return { ...state, isFetching: false, error: action.payload };
  default:
    return state;
  }
};

export default drinksReducer;
