export const fetchMealsByIngredient = (ingredient) => {
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  return fetch(url)
    .then((res) => res.json())
    .then((data) => data.meals)
    .catch((error) => error);
};

export const fetchMealsByName = (name) => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
  return fetch(url)
    .then((res) => res.json())
    .then((data) => data.meals)
    .catch((error) => error);
};

export const fetchMealsByFirstLetter = (firstLetter) => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`;
  return fetch(url)
    .then((res) => res.json())
    .then((data) => data.meals)
    .catch((error) => error);
};
