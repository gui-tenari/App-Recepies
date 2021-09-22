import React from 'react';
import { Link } from 'react-router-dom';

import drinkIcon from '../../images/drinkIcon.svg';
import exploreIcon from '../../images/exploreIcon.svg';
import mealIcon from '../../images/mealIcon.svg';

import './style.css';

const Footer = () => (
  <footer data-testid="footer">
    <Link to="/bebidas">
      <img data-testid="drinks-bottom-btn" src={ drinkIcon } alt="Bebidas" />
    </Link>
    <Link to="/explorar">
      <img data-testid="explore-bottom-btn" src={ exploreIcon } alt="Explorar" />
    </Link>
    <Link to="/comidas">
      <img data-testid="food-bottom-btn" src={ mealIcon } alt="Comidas" />
    </Link>
  </footer>
);

export default Footer;
