import React, { useState } from 'react'

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const { history } = props;
    localStorage.setItem('user', JSON.stringify({email: email}))
    localStorage.setItem('mealsToken', '1')
    localStorage.setItem('cocktailsToken', '1')
    history.push("/comidas")
  }

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  return(
    <>
    <input 
      type="text"
      value={ email }
      onChange={ (e) => setEmail(e.target.value)}
      data-testid="email-input"
    />
    <input 
      type="password"
      value={ password }
      onChange={ (e) => setPassword(e.target.value)}
      data-testid="password-input"
    />
    <button
      type="button"
      data-testid="login-submit-btn"
      onClick={ handleLogin }
      disabled={ !(regex.test(email) && password.length > 6)  }

    >
      Login
    </button>
    </>
  )
}

export default Login;