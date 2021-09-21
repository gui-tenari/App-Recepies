import React from 'react';
import { Link } from 'react-router-dom';

function BottomMenu() {

  return (
    <footer data-testid="footer">
      <Link to='/comidas' data-testid="drinks-bottom-btn">Comidas</Link>
      <Link to='/bebidas' data-testid="drinks-bottom-btn">Bebidas</Link>
      <Link to='/explorar' data-testid="drinks-bottom-btn">Explorar</Link>
    </footer>
  )
}