import React, { useEffect, useState } from 'react';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import IngredientCard from '../../components/IngredientCard';
// import Loading from '../../components/Loading';
import { getIngredients } from '../../services/recipesAPI';

const MealIngredients = () => {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    async function fetchIngredients() {
      try {
        const ingredientsList = await getIngredients('meals');
        setIngredients(ingredientsList);
      } catch (error) {
        global.alert('Não foram encontrados ingredientes');
      }
    }
    fetchIngredients();
  }, []);

  return (
    <div>
      <Header title="Explorar Ingredientes" />
      {ingredients.map((ingredient, index) => (
        <IngredientCard
          key={ index }
          index={ index }
          ingredient={ ingredient }
          type="meals"
        />
      ))}
      <Footer />
    </div>
  );
};

export default MealIngredients;
