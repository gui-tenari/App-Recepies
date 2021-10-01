import { combineReducers } from 'redux';

import drinksReducer from './drinksReducer';
import mealsReducer from './mealsReducer';
import favoriteRecipesReducer from './favoriteRecipesReducer';
import inProgressRecipesReducer from './inProgressRecipesReducer';

const rootReducer = combineReducers({
  meals: mealsReducer,
  drinks: drinksReducer,
  favoriteRecipes: favoriteRecipesReducer,
  inProgressRecipes: inProgressRecipesReducer,
});

export default rootReducer;
