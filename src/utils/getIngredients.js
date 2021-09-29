const MAX_INGREDIENTS = 20;

const getIngredients = (recipe) => {
  const ingredients = [];

  for (let i = 0; i < MAX_INGREDIENTS; i += 1) {
    const currentIngredient = recipe[`strIngredient${i}`];
    const currentMeasure = recipe[`strMeasure${i}`] || '';

    if (currentIngredient) {
      ingredients.push({ ingredient: currentIngredient, measure: currentMeasure });
    }
  }

  return ingredients;
};

export default getIngredients;
