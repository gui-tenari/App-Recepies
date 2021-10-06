const FAVORITE_RECIPES_ACTIONS = {
  ADD_FAVORITE_RECIPE: 'ADD_FAVORITE_RECIPE',
  REMOVE_FAVORITE_RECIPE: 'REMOVE_FAVORITE_RECIPE',
};

const addFavoriteRecipe = (recipe) => ({
  type: FAVORITE_RECIPES_ACTIONS.ADD_FAVORITE_RECIPE,
  payload: recipe,
});

const removeFavoriteRecipe = (recipeId) => ({
  type: FAVORITE_RECIPES_ACTIONS.REMOVE_FAVORITE_RECIPE,
  payload: recipeId,
});

export const toggleFavoriteRecipe = (recipe, isFavorite) => (dispatch) => {
  if (isFavorite) {
    dispatch(removeFavoriteRecipe(recipe.id));
  } else {
    dispatch(addFavoriteRecipe(recipe));
  }
};

export default FAVORITE_RECIPES_ACTIONS;
