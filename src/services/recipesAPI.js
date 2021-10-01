const MEALS_BASE_URL = 'https://www.themealdb.com/api/json/v1';
const DRINKS_BASE_URL = 'https://www.thecocktaildb.com/api/json/v1';
const ERROR_MESSAGE = 'Não foram encontradas receitas!';

const MAX_RECIPES = 12;
const MAX_INGREDIENTS = 12;
const MAX_CATEGORIES = 5;

const getToken = (key) => {
  const token = localStorage.getItem(key);
  const parsedToken = token ? JSON.parse(token) : '1';

  return parsedToken;
};

const getTypeInfo = (type) => {
  if (type === 'meals') {
    return [getToken('mealsToken'), MEALS_BASE_URL];
  }
  return [getToken('cocktailsToken'), DRINKS_BASE_URL];
};

export const getRecipes = async (type) => {
  const [typeToken, typeUrl] = getTypeInfo(type);

  const response = await fetch(`${typeUrl}/${typeToken}/search.php?s=`);
  const data = await response.json();

  if (!data[type]) throw new Error(ERROR_MESSAGE);

  return data[type].slice(0, MAX_RECIPES);
};

export const getRecipeById = async (type, id) => {
  const [typeToken, typeUrl] = getTypeInfo(type);

  const response = await fetch(`${typeUrl}/${typeToken}/lookup.php?i=${id}`);
  const data = await response.json();

  if (!data[type]) throw new Error(ERROR_MESSAGE);

  return data[type][0];
};

export const getRecipesByIngredient = async (type, ingredient) => {
  const [typeToken, typeUrl] = getTypeInfo(type);

  const response = await fetch(
    `${typeUrl}/${typeToken}/filter.php?i=${ingredient}`,
  );
  const data = await response.json();

  if (!data[type]) throw new Error(ERROR_MESSAGE);

  return data[type].slice(0, MAX_RECIPES);
};

export const getRecipesByName = async (type, name) => {
  const [typeToken, typeUrl] = getTypeInfo(type);

  const response = await fetch(`${typeUrl}/${typeToken}/search.php?s=${name}`);
  const data = await response.json();

  if (!data[type]) throw new Error(ERROR_MESSAGE);

  return data[type].slice(0, MAX_RECIPES);
};

export const getRecipesByFirstLetter = async (type, firstLetter) => {
  const [typeToken, typeUrl] = getTypeInfo(type);

  const response = await fetch(
    `${typeUrl}/${typeToken}/search.php?f=${firstLetter}`,
  );
  const data = await response.json();

  if (!data[type]) throw new Error(ERROR_MESSAGE);

  return data[type].slice(0, MAX_RECIPES);
};

export const getRecipesByCategory = async (type, category) => {
  const [typeToken, typeUrl] = getTypeInfo(type);

  const response = await fetch(
    `${typeUrl}/${typeToken}/filter.php?c=${category}`,
  );
  const data = await response.json();

  if (!data[type]) throw new Error(ERROR_MESSAGE);

  return data[type].slice(0, MAX_RECIPES);
};

export const getRandomRecipe = async (type) => {
  let url;
  if (type === 'meals') {
    url = `${MEALS_BASE_URL}/1/random.php`;
  } else {
    url = `${DRINKS_BASE_URL}/1/random.php`;
  }
  const response = await fetch(url);
  const data = await response.json();
  return (data);
};

export const getRecipeCategories = async (type) => {
  const [typeToken, typeUrl] = getTypeInfo(type);

  const response = await fetch(`${typeUrl}/${typeToken}/list.php?c=list`);
  const data = await response.json();

  if (!data[type]) throw new Error(ERROR_MESSAGE);

  return data[type].slice(0, MAX_CATEGORIES);
};

export const getIngredients = async (type) => {
  let url;
  if (type === 'meals') {
    url = `${MEALS_BASE_URL}/1/list.php?i=list`;
  } else {
    url = `${DRINKS_BASE_URL}/1/list.php?i=list`;
  }
  const response = await fetch(url);
  const data = await response.json();

  return data[type].slice(0, MAX_INGREDIENTS);
};

export const getMealAreas = async () => {
  const [typeToken, typeUrl] = getTypeInfo('meals');
  const response = await fetch(`${typeUrl}/${typeToken}/list.php?a=list`);
  const data = await response.json();

  return data.meals;
};

export const getMealsByArea = async (area) => {
  const [typeToken, typeUrl] = getTypeInfo('meals');
  const response = await fetch(`${typeUrl}/${typeToken}/filter.php?a=${area}`);
  const data = await response.json();

  return data.meals.slice(0, MAX_RECIPES);
};
