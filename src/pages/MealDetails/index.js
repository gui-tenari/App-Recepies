import React from 'react';

const MealDetails = (props) => {
  const { match: { params: { id } } } = props;
  return (
    <div>
      <img data-testid="recipe-photo"/>
      <h1 data-testid="recipe-title">x</h1>
      <button type="button" data-testid="share-btn">Compartilhar</button>
      <button type="button" data-testid="favorite-btn">Favoritar</button>
      <p data-testid="recipe-category">Categoria</p>
      <div data-testid={`${id}-ingredient-name-and-measure`}>Ingredientes</div>
      <p data-testid="instructions">Instruções</p>
      <video data-testid="video">Video</video>
      <div data-testid={`${id}-recomendation-card`}>Recomendações</div>
      <button type="button" data-testid="start-recipe-btn">Iniciar Receita</button>
    </div>
  )
};

export default MealDetails;
