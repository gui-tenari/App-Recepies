import React from 'react';
import { Link } from 'react-router-dom';

import drinkIcon from '../../images/drinkIcon.svg';
import exploreIcon from '../../images/exploreIcon.svg';
import mealIcon from '../../images/mealIcon.svg';

import './style.css';

const Footer = () => (
  <footer data-testid="footer">
    <Link to="/bebidas" data-testid="drinks-bottom-btn">
      <img src={ drinkIcon } alt="Bebidas" />
    </Link>
    <Link to="/explorar" data-testid="explore-bottom-btn">
      <img src={ exploreIcon } alt="Explorar" />
    </Link>
    <Link to="/comidas" data-testid="food-bottom-btn">
      <img src={ mealIcon } alt="Comidas" />
    </Link>
  </footer>
);

export default Footer;
