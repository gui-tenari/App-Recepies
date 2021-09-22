import React from 'react';
import { Link } from 'react-router-dom';

function Profile() {
  const storageEmail = localStorage.getItem('user');
  const { email } = JSON.parse(storageEmail);

  return (
    <main>
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
