import React from 'react';
import { Link } from 'react-router-dom';

function ProfilePage() {
  return (
    <main>
      <div data-testid="profile-email">Email</div>
      <Link to="/" data-testid="profile-done-btn">Receitas feitas</Link>
      <Link to="/" data-testid="profile-favorite-btn">Receitas favoritas</Link>
      <Link to="/" data-testid="profile-logout-btn">Sair</Link>
    </main>
  );
}

export default ProfilePage;
