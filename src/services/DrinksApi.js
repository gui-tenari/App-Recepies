export const fetchDrinksByIngredient = (ingredient) => {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  return fetch(url)
    .then((res) => res.json())
    .then((data) => data.drinks)
    .catch((error) => error);
};

export const fetchDrinksByName = (name) => {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`;
  return fetch(url)
    .then((res) => res.json())
    .then((data) => data.drinks)
    .catch((error) => error);
};

export const fetchDrinksByFirstLetter = (firstLetter) => {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`;
  return fetch(url)
    .then((res) => res.json())
    .then((data) => data.drinks)
    .catch((error) => error);
};
