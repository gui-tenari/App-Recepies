import { combineReducers } from 'redux';

import mealsReducer from './mealsReducer';

const rootReducer = combineReducers({
  meals: mealsReducer,
});

export default rootReducer;
