import React, { useState, useEffect } from 'react';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import IngredientCard from '../../components/IngredientCard';

import { getIngredients } from '../../services/recipesAPI';

const DrinkIngredients = () => {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    async function fetchIngredients() {
      try {
        const ingredientsList = await getIngredients('drinks');
        setIngredients(ingredientsList);
      } catch (error) {
        global.alert('Não foram encontrados ingredientes');
      }
    }
    fetchIngredients();
  }, []);

  return (
    <>
      <Header title="Explorar Ingredientes" />
      <div className="explore-ingredients">
        {ingredients.map((ingredient, index) => (
          <IngredientCard
            key={ index }
            index={ index }
            ingredient={ ingredient }
            type="drinks"
          />
        ))}
      </div>
      <Footer />
    </>
  );
};

export default DrinkIngredients;
