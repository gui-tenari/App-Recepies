const typeTable = {
  comida: 'Meal',
  bebida: 'Drink',
};

export const getFavoriteRecipes = () => {
  const favoriteRecipes = localStorage.getItem('favoriteRecipes');

  return favoriteRecipes ? JSON.parse(favoriteRecipes) : [];
};

export const setFavoriteRecipes = (recipes) => {
  localStorage.setItem('favoriteRecipes', JSON.stringify(recipes));
};

export const toggleFavoriteRecipe = (recipe, type, isFavorite) => {
  const favoriteRecipes = getFavoriteRecipes();

  if (isFavorite) {
    const newFavoriteRecipes = favoriteRecipes.filter(
      (favoriteRecipe) => favoriteRecipe.id !== recipe[`id${typeTable[type]}`],
    );

    setFavoriteRecipes(newFavoriteRecipes);
  } else {
    const newFavoriteRecipes = [...favoriteRecipes, {
      id: recipe[`id${typeTable[type]}`],
      type,
      area: recipe.strArea || '',
      category: recipe.strCategory,
      alcoholicOrNot: recipe.strAlcoholic || '',
      name: recipe[`str${typeTable[type]}`],
      image: recipe[`str${typeTable[type]}Thumb`],
    }];

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

export const getTodaysDate = () => {
  // código para pegar data atual retirado de https://www.horadecodar.com.br/2021/04/03/como-pegar-a-data-atual-com-javascript/
  const data = new Date();
  const dia = String(data.getDate()).padStart(2, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const ano = data.getFullYear();
  const dataAtual = `${dia}/${mes}/${ano}`;
  return dataAtual;
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
    imagem: recipe[`str${type}Thumb`],
    doneDate: getTodaysDate(),
    tags: recipe.strTags ? recipe.strTags.split(',') : [],
  };
  doneRecipesParse.push(finishedRecipe);
  localStorage.setItem('doneRecipes', JSON.stringify(doneRecipesParse));
};
