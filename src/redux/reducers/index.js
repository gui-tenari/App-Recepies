import { combineReducers } from 'redux';

import drinksReducer from './drinksReducer';
import mealsReducer from './mealsReducer';

const rootReducer = combineReducers({
  meals: mealsReducer,
  drinks: drinksReducer,
});

export default rootReducer;
