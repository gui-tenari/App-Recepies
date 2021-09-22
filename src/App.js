import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from './pages/Login.js';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      {/* <Route path="/comidas/:id/in-progress" component={ MealProgress } />
      <Route path="/comidas/:id" component={ MealDetails } />
      <Route path="/comidas" component={ Meals } />
      <Route path="/bebidas/:id/in-progress" component={ DrinkProgress } />
      <Route path="/bebidas/:id" component={ DrinkDetails } />
      <Route path="/bebidas" component={ Drinks } />
      <Route exact path="/explorar" component={ Explore } />
      <Route path="/explorar/comidas/ingredientes" component={ MealIngredients } />
      <Route path="/explorar/comidas/area" component={ MealAreas } />
      <Route path="/explorar/comidas" component={ ExploreMeals } />
      <Route path="/explorar/bebidas/ingredients" component={ DrinkIngredients } />
      <Route path="/explorar/bebidas/area" component={ DrinkAreas } />
      <Route path="/explorar/bebidas" component={ ExploreDrinks } />
      <Route path="/profile" component={ Profile } />
      <Route path="/receitas-feitas" component={ FinishedRecipes } />
      <Route path="/receitas-favoritas" component={ FavoriteRecipes } /> */}
    </Switch>
  );
}

export default App;
