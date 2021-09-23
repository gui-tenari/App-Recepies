import React, { useState, useEffect } from 'react';

const DrinkDetails = (props) => {
  const { match: { params: { id } } } = props;
  const [drinks, setDrinks] = useState({});

  useEffect(() => {
    async function getDrink() {
      const promiseDrinks = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      const fetchedDrink = await promiseDrinks.json();
      setDrinks(fetchedDrink.drinks[0]);
    }
    getDrink();
  }, []);

  return (
    <div>
      <img data-testid="recipe-photo" alt="drink" />
      <h1 data-testid="recipe-title">{drinks.name}</h1>
      <button type="button" data-testid="share-btn">Compartilhar</button>
      <button type="button" data-testid="favorite-btn">Favoritar</button>
      <p data-testid="recipe-category">Categoria</p>
      <div data-testid={ `${id}-ingredient-name-and-measure` }>Ingredientes</div>
      <p data-testid="instructions">Instruções</p>
      <div data-testid={ `${id}-recomendation-card` }>Recomendações</div>
      <button type="button" data-testid="start-recipe-btn">Iniciar Receita</button>
    </div>
  );
};

DrinkDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number,
    }),
  }).isRequired,
};

export default DrinkDetails;
