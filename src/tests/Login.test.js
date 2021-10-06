import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Login from '../pages/Login/index';

// beforeEach(() => {
// renderWithRouter(<Login />);
// });

const EMAIL_INPUT_TEST_ID = 'email-input';
const PASSWORD_INPUT_TEST_ID = 'password-input';
const LOGIN_BUTTON_TEST_ID = 'login-submit-btn';
const EMAIL_TEST = 'email@mail.com';

describe('2 - Testa componentes da tela de Login', () => {
  it('Tem os data-testids email-input, password-input e login-submit-btn', () => {
    renderWithRouter(<Login />);
    const email = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const senha = screen.getByTestId(PASSWORD_INPUT_TEST_ID);
    const loginButton = screen.getByTestId(LOGIN_BUTTON_TEST_ID);

    expect(email).toBeInTheDocument();
    expect(senha).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });
});

describe('3 - E possivel digitar no input email', () => {
  it('É possível escrever o email', () => {
    renderWithRouter(<Login />);
    const email = screen.getByTestId(EMAIL_INPUT_TEST_ID);

    userEvent.type(email, EMAIL_TEST);
  });
});

describe('4 - É possivel digitar no input password', () => {
  it('É possível escrever a senha', () => {
    renderWithRouter(<Login />);
    const senha = screen.getByTestId(PASSWORD_INPUT_TEST_ID);

    userEvent.type(senha, '1234567');
  });
});

describe('5 - Só é valido se email for valido e senha maior que 6 caracteres', () => {
  it('O botão deve estar desativado se o email for inválido', () => {
    renderWithRouter(<Login />);
    const email = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const senha = screen.getByTestId(PASSWORD_INPUT_TEST_ID);
    const loginButton = screen.getByTestId(LOGIN_BUTTON_TEST_ID);

    expect(loginButton).toBeDisabled();
    userEvent.type(email, 'email@mail');
    userEvent.type(senha, '1234567');
    expect(loginButton).toBeDisabled();

    expect(loginButton).toBeDisabled();
    userEvent.type(email, 'email.com');
    expect(loginButton).toBeDisabled();
  });

  it('O botão deve estar desativado se a senha deve tiver 6 caracteres ou menos', () => {
    renderWithRouter(<Login />);
    const email = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const senha = screen.getByTestId(PASSWORD_INPUT_TEST_ID);
    const loginButton = screen.getByTestId(LOGIN_BUTTON_TEST_ID);

    expect(loginButton).toBeDisabled();
    userEvent.type(email, EMAIL_TEST);
    userEvent.type(senha, '123456');
    expect(loginButton).toBeDisabled();
  });

  it('O botão deve estar ativado se o email e a senha forem válidos', () => {
    renderWithRouter(<Login />);
    const email = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const senha = screen.getByTestId(PASSWORD_INPUT_TEST_ID);
    const loginButton = screen.getByTestId(LOGIN_BUTTON_TEST_ID);

    expect(loginButton).toBeDisabled();
    userEvent.type(email, EMAIL_TEST);
    userEvent.type(senha, '1234567');
    expect(loginButton).toBeEnabled();
  });
});

describe('6 - Salve 2 tokens no localStorage após a submissão', () => {
  it('mealsToken e cocktailsToken devem estar salvos em localStorage', () => {
    renderWithRouter(<Login />);
    localStorage.clear();
    const email = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const senha = screen.getByTestId(PASSWORD_INPUT_TEST_ID);
    const loginButton = screen.getByTestId(LOGIN_BUTTON_TEST_ID);

    expect(loginButton).toBeDisabled();
    expect(localStorage.getItem('mealsToken')).toBe(null);
    expect(localStorage.getItem('cocktailsToken')).toBe(null);

    expect(loginButton).toBeDisabled();
    userEvent.type(email, EMAIL_TEST);
    userEvent.type(senha, '1234567');
    expect(loginButton).toBeEnabled();
    userEvent.click(loginButton);
    expect(localStorage.getItem('mealsToken')).toBe('1');
    expect(localStorage.getItem('cocktailsToken')).toBe('1');
  });
});

describe('7 - Salve o e-mail do usuário no localStorage na chave user', () => {
  it('Após a submissão a chave user deve estar salva em localStorage', () => {
    renderWithRouter(<Login />);
    localStorage.clear();
    const email = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const senha = screen.getByTestId(PASSWORD_INPUT_TEST_ID);
    const loginButton = screen.getByTestId(LOGIN_BUTTON_TEST_ID);

    expect(loginButton).toBeDisabled();
    expect(localStorage.getItem('user')).toBe(null);

    userEvent.type(email, EMAIL_TEST);
    userEvent.type(senha, '1234567');
    expect(loginButton).toBeEnabled();
    userEvent.click(loginButton);

    expect(JSON.parse(localStorage.getItem('user'))).toEqual({ email: EMAIL_TEST });
  });
});

describe('8 - Redireciona para a tela principal de receitas de comidas', () => {
  it('A rota muda para a tela principal de receitas de comidas', () => {
    const { history } = renderWithRouter(<Login />);
    localStorage.clear();
    const email = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const senha = screen.getByTestId(PASSWORD_INPUT_TEST_ID);
    const loginButton = screen.getByTestId(LOGIN_BUTTON_TEST_ID);

    expect(loginButton).toBeDisabled();
    expect(localStorage.getItem('user')).toBe(null);

    userEvent.type(email, EMAIL_TEST);
    userEvent.type(senha, '1234567');
    expect(loginButton).toBeEnabled();
    userEvent.click(loginButton);
    expect(history.location.pathname).toBe('/comidas');
  });
});
