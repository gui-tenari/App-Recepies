import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Button from '../../components/Button';

import './style.css';

function Profile() {
  const [email, setEmail] = useState('');
  const history = useHistory();

  useEffect(() => {
    const storageEmail = localStorage.getItem('user');

    if (storageEmail) {
      setEmail(JSON.parse(storageEmail).email);
    }
  }, []);

  return (
    <>
      <Header title="Perfil" />
      <div className="profile-content">
        <p data-testid="profile-email">{email}</p>
        <Button
          text="Receitas Feitas"
          onClick={ () => history.push('/receitas-feitas') }
        />
        <Button
          text="Receitas Favoritas"
          onClick={ () => history.push('/receitas-favoritas') }
        />
        <Button
          text="Sair"
          onClick={ () => localStorage.clear() }
        />
      </div>
      <Footer />
    </>
  );
}

export default Profile;
