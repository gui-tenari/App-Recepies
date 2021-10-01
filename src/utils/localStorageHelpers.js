export const getFavoriteRecipes = () => {
  const favoriteRecipes = localStorage.getItem('favoriteRecipes');

  return favoriteRecipes ? JSON.parse(favoriteRecipes) : [];
};

export const setFavoriteRecipes = (recipes) => {
  localStorage.setItem('favoriteRecipes', JSON.stringify(recipes));
};

export const toggleFavoriteRecipe = (recipe, isFavorite) => {
  const favoriteRecipes = getFavoriteRecipes();

  if (isFavorite) {
    const newFavoriteRecipes = favoriteRecipes.filter(
      (favoriteRecipe) => favoriteRecipe.id !== recipe.id,
    );

    setFavoriteRecipes(newFavoriteRecipes);
  } else {
    const newFavoriteRecipes = [...favoriteRecipes, recipe];

    setFavoriteRecipes(newFavoriteRecipes);
  }
};

export const getInProgressRecipes = () => {
  const inProgressRecipes = localStorage.getItem('inProgressRecipes');

  return inProgressRecipes ? JSON.parse(inProgressRecipes) : {
    meals: {},
    cocktails: {},
  };
};

export const setInProgressRecipes = (recipes, type, id) => {
  const inProgressRecipes = getInProgressRecipes();

  inProgressRecipes[type][id] = recipes;

  localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
};

export const getFinishedRecipe = (recipe, type) => {
  const doneRecipes = localStorage.getItem('doneRecipes');
  const doneRecipesParse = JSON.parse(doneRecipes);
  const finishedRecipe = {
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
  doneRecipesParse.push(finishedRecipe);
  localStorage.setItem('doneRecipes', JSON.stringify(doneRecipesParse));
};
