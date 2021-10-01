const IN_PROGRESS_RECIPES_ACTIONS = {
  SET_IN_PROGRESS_MEAL: 'SET_IN_PROGRESS_MEAL',
  REMOVE_IN_PROGRESS_MEAL: 'REMOVE_IN_PROGRESS_MEAL',
  SET_IN_PROGRESS_COCKTAIL: 'SET_IN_PROGRESS_COCKTAIL',
  REMOVE_IN_PROGRESS_COCKTAIL: 'REMOVE_IN_PROGRESS_COCKTAIL',
};

const setInProgressMeal = (id, ingredientsProgress) => ({
  type: IN_PROGRESS_RECIPES_ACTIONS.SET_IN_PROGRESS_MEAL,
  payload: { [id]: ingredientsProgress },
});

const setInProgressCocktail = (id, ingredientsProgress) => ({
  type: IN_PROGRESS_RECIPES_ACTIONS.SET_IN_PROGRESS_COCKTAIL,
  payload: { [id]: ingredientsProgress },
});

export const addRecipeIngredient = (id, type, ingredient) => (dispatch, getState) => {
  const { inProgressRecipes } = getState();
  const recipes = type === 'bebida'
    ? inProgressRecipes.cocktails
    : inProgressRecipes.meals;

  const currentMealProgress = recipes[id] || [];
  const updatedProgress = [...currentMealProgress, ingredient];

  dispatch(
    type === 'bebida'
      ? setInProgressCocktail(id, updatedProgress)
      : setInProgressMeal(id, updatedProgress),
  );
};

export const removeRecipeIngredient = (id, type, ingredient) => (dispatch, getState) => {
  const { inProgressRecipes } = getState();
  const recipes = type === 'bebida'
    ? inProgressRecipes.cocktails
    : inProgressRecipes.meals;

  const currentMealProgress = recipes[id] || [];
  const updatedProgress = currentMealProgress.filter(
    (currentIngredient) => currentIngredient !== ingredient,
  );

  dispatch(
    type === 'bebida'
      ? setInProgressCocktail(id, updatedProgress)
      : setInProgressMeal(id, updatedProgress),
  );
};

export default IN_PROGRESS_RECIPES_ACTIONS;
