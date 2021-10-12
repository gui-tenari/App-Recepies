import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import Input from '../../components/Input';
import Button from '../../components/Button';

import emailIcon from '../../images/icons/email.svg';
import passwordIcon from '../../images/icons/password.svg';

import './style.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleLogin = (event) => {
    event.preventDefault();

    localStorage.setItem('user', JSON.stringify({ email }));
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    localStorage.setItem(
      'inProgressRecipes',
      JSON.stringify({ meals: {}, cocktails: {} }),
    );
    localStorage.setItem('doneRecipes', JSON.stringify([]));
    history.push('/comidas');
  };

  const REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const MIN_PASSWORD_LENGTH = 6;

  return (
    <div className="login-page">
      <h1 className="login-title">My Recipes</h1>
      <form className="login-form" onSubmit={ handleLogin }>
        <Input
          type="email"
          icon={ emailIcon }
          placeholder="Email"
          value={ email }
          onChange={ (e) => setEmail(e.target.value) }
          testId="email-input"
        />
        <Input
          type="password"
          icon={ passwordIcon }
          placeholder="Senha"
          value={ password }
          onChange={ (e) => setPassword(e.target.value) }
          testId="password-input"
        />
        <Button
          type="submit"
          disabled={
            !(REGEX.test(email) && password.length > MIN_PASSWORD_LENGTH)
          }
          text="Entrar"
          testId="login-submit-btn"
        />
      </form>
    </div>
  );
}

export default Login;
