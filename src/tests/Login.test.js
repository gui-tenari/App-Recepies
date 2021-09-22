import React from 'react';
import { screen } from '@testing-library/react';
import Login from '../pages/Login.js';

describe('Testa componentes da tela de Login', () => {
  const EMAIL_INPUT_TEST_ID = 'email-input';
  const PASSWORD_INPUT_TEST_ID = 'password-input';
  // const VALID_EMAIL = 'alguem@email.com';
  // const VALID_PASSWORD = '123456';

  test('se existem dois inputs', () => {
    render(<Login />);
    const email = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const senha = screen.getByTestId(PASSWORD_INPUT_TEST_ID);

    expect(email).toBeInTheDocument();
    expect(senha).toBeInTheDocument();
  });
});
