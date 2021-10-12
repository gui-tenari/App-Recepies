import React from 'react';
import { useHistory } from 'react-router-dom';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Button from '../../components/Button';

import './style.css';

const Explore = () => {
  const history = useHistory();

  return (
    <>
      <Header title="Explorar" />
      <div className="explore-content">
        <div className="bg-meal">
          <Button
            text="Explorar Comidas"
            onClick={ () => history.push('/explorar/comidas') }
            testId="explore-food"
          />
        </div>
        <div className="bg-drink">
          <Button
            text="Explorar Bebidas"
            onClick={ () => history.push('/explorar/bebidas') }
            testId="explore-drinks"
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Explore;
