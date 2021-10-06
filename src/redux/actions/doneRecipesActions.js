const DONE_RECIPES_ACTIONS = {
  ADD_DONE_RECIPE: 'ADD_DONE_RECIPE',
};

const addDoneRecipe = (recipe) => ({
  type: DONE_RECIPES_ACTIONS.ADD_DONE_RECIPE,
  payload: recipe,
});

export const setDoneRecipe = (recipe, type) => (dispatch) => {
  const doneRecipe = {
    id: recipe[`id${type}`],
    type: type === 'Meal' ? 'comida' : 'bebida',
    area: recipe.strArea,
    category: recipe.strCategory,
    alcoholicOrNot: recipe.strAlcoholic || '',
    name: recipe[`str${type}`],
    image: recipe[`str${type}Thumb`],
    doneDate: Intl.DateTimeFormat('pt-BR').format(Date.now()),
    tags: recipe.strTags ? recipe.strTags.split(',') : [],
  };

  dispatch(addDoneRecipe(doneRecipe));
};

export default DONE_RECIPES_ACTIONS;
