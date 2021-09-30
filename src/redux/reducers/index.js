import { combineReducers } from 'redux';

import drinksReducer from './drinksReducer';
import mealsReducer from './mealsReducer';
import favoriteRecipesReducer from './favoriteRecipesReducer';

const rootReducer = combineReducers({
  meals: mealsReducer,
  drinks: drinksReducer,
  favoriteRecipes: favoriteRecipesReducer,
});

export default rootReducer;
