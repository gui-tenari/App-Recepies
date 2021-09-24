import React from 'react';
import { useHistory } from 'react-router-dom';

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
    </div>
  );
};

export default Explore;
