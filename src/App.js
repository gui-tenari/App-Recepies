import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from './pages/Login';
import MealProgress from './pages/MealProgress';
import MealDetails from './pages/MealDetails';
import Meals from './pages/Meals';
import DrinkDetails from './pages/DrinkDetails';
import DrinkProgress from './pages/DrinkProgress';
import Drinks from './pages/Drinks';
import Explore from './pages/Explore';
import MealIngredients from './pages/MealIngredients';
import MealAreas from './pages/MealAreas';
import ExploreMeals from './pages/ExploreMeals';
import DrinkIngredients from './pages/DrinkIngredients';
import ExploreDrinks from './pages/ExploreDrinks';
import Profile from './pages/Profile';
import FinishedRecipes from './pages/FinishedRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import NotFound from './pages/NotFound';

import './App.css';

function App() {
  return (
    <div className="app">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/comidas/:id/in-progress" component={ MealProgress } />
        <Route
          path="/comidas/:id"
          render={ (props) => <MealDetails { ...props } /> }
        />
        <Route path="/comidas" component={ Meals } />
        <Route path="/bebidas/:id/in-progress" component={ DrinkProgress } />
        <Route
          path="/bebidas/:id"
          render={ (props) => <DrinkDetails { ...props } /> }
        />
        <Route path="/bebidas" component={ Drinks } />
        <Route exact path="/explorar" component={ Explore } />
        <Route
          path="/explorar/comidas/ingredientes"
          component={ MealIngredients }
        />
        <Route path="/explorar/comidas/area" component={ MealAreas } />
        <Route exact path="/explorar/comidas" component={ ExploreMeals } />
        <Route
          path="/explorar/bebidas/ingredientes"
          component={ DrinkIngredients }
        />
        <Route exact path="/explorar/bebidas" component={ ExploreDrinks } />
        <Route path="/perfil" component={ Profile } />
        <Route path="/receitas-feitas" component={ FinishedRecipes } />
        <Route path="/receitas-favoritas" component={ FavoriteRecipes } />
        <Route component={ NotFound } />
      </Switch>
    </div>
  );
}

export default App;
