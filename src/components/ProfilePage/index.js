import React from 'react';
import { Link } from 'react-router-dom';

function ProfilePage() {
  const storageEmail = localStorage.getItem('user');
  const emailUser = JSON.parse(storageEmail);
  return (
    <main>
      <div data-testid="profile-email">{emailUser}</div>
      <Link to="/receitas-feitas" data-testid="profile-done-btn">
        Receitas feitas
      </Link>
      <Link to="/receitas-favoritas" data-testid="profile-favorite-btn">
        Receitas favoritas
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

export default ProfilePage;
