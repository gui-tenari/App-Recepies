const MEALS_BASE_URL = 'https://www.themealdb.com/api/json/v1';
const DRINKS_BASE_URL = 'https://www.thecocktaildb.com/api/json/v1';
const MAX_RECIPES = 12;

const getToken = (key) => {
  const token = localStorage.getItem(key);
  const parsedToken = token ? JSON.parse(token) : '1';

  return parsedToken;
};

export const getMeals = async () => {
  const token = getToken('mealsToken');

  const response = await fetch(`${MEALS_BASE_URL}/${token}/search.php?s=`);
  const data = await response.json();

  if (!data.meals) throw new Error('Não foram encontradas comidas!');

  return data.meals.slice(0, MAX_RECIPES);
};

export const getDinks = async () => {
  const token = getToken('cocktailsToken');

  const response = await fetch(`${DRINKS_BASE_URL}/${token}/search.php?s=`);
  const data = await response.json();

  if (!data.drinks) throw new Error('Não foram encontradas bebidas!');

  return data.drinks.slice(0, MAX_RECIPES);
};
