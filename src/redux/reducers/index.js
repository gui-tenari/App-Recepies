import { combineReducers } from 'redux';

import drinksReducer from './drinksReducer';
import mealsReducer from './mealsReducer';
import favoriteRecipesReducer from './favoriteRecipesReducer';
import inProgressRecipesReducer from './inProgressRecipesReducer';
import doneRecipesReducer from './doneRecipesReducer';

const rootReducer = combineReducers({
  meals: mealsReducer,
  drinks: drinksReducer,
  favoriteRecipes: favoriteRecipesReducer,
  inProgressRecipes: inProgressRecipesReducer,
  doneRecipes: doneRecipesReducer,
});

export default rootReducer;
