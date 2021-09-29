import React from 'react';
import { useHistory } from 'react-router-dom';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

const Explore = () => {
  const history = useHistory();

  function handleClickBebidas() {
    history.push('/explorar/bebidas');
  }

  function handleClickComidas() {
    history.push('/explorar/comidas');
  }

  return (
    <div>
      <Header title="Explorar" />
      <button
        type="button"
        onClick={ handleClickComidas }
        data-testid="explore-food"
      >
        Explorar Comidas
      </button>
      <button
        type="button"
        onClick={ handleClickBebidas }
        data-testid="explore-drinks"
      >
        Explorar Bebidas
      </button>
      <Footer />
    </div>
  );
};

export default Explore;
