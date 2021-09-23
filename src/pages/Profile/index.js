import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Header from '../../components/Header';

function Profile() {
  const [email, setEmail] = useState('');

  useEffect(() => {
    const storageEmail = localStorage.getItem('user');

    if (storageEmail) {
      setEmail(JSON.parse(storageEmail).email);
    }
  }, []);

  return (
    <main>
      <Header title="Perfil" />
      <div data-testid="profile-email">{email}</div>
      <Link to="/receitas-feitas" data-testid="profile-done-btn">
        Receitas Feitas
      </Link>
      <Link to="/receitas-favoritas" data-testid="profile-favorite-btn">
        Receitas Favoritas
      </Link>
      <Link
        to="/"
        data-testid="profile-logout-btn"
        onClick={ () => localStorage.clear() }
      >
        Sair
      </Link>
    </main>
  );
}

export default Profile;
