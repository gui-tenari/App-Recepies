import React, { useState, useEffect } from 'react';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import IngredientCard from '../../components/IngredientCard';
import Loading from '../../components/Loading';

import { getIngredients } from '../../services/recipesAPI';

const DrinkIngredients = () => {
  const [ingredients, setIngredients] = useState([]);
  const [isFetching, setFetching] = useState(true);

  useEffect(() => {
    async function fetchIngredients() {
      try {
        setFetching(true);
        const ingredientsList = await getIngredients('drinks');
        setIngredients(ingredientsList);
        setFetching(false);
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
        {isFetching ? (
          <Loading />
        ) : (
          ingredients.map((ingredient, index) => (
            <IngredientCard
              key={ index }
              index={ index }
              ingredient={ ingredient }
              type="drinks"
            />
          ))
        )}
      </div>
      <Footer />
    </>
  );
};

export default DrinkIngredients;
