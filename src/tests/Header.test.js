import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from '../components/Header/index';
import App from '../App';
// import Login from '../pages/Login/index';
// import userEvent from '@testing-library/user-event';

import renderWithRouter from './renderWithRouter';
import { renderWithRouterAndStore } from './renderWithRouterAndStore';

const BUTTON_PEFIL_TEST_ID = 'profile-top-btn';
const TITLE_HEADER_TEST_ID = 'page-title';
const BUTTON_SEARCH_TEST_ID = 'search-top-btn';
const SEACH_TEST_ID = 'search-input';

describe('9 - Implemente os elementos do header', () => {
  it('Tem os data-testids profile-top-btn, page-title e search-top-btn', () => {
    const { history } = renderWithRouter(<Header title="Comidas" hasSearchBar />);
    history.push('/comidas');
    expect(history.location.pathname).toBe('/comidas');

    const buttonProfile = screen.getByTestId(BUTTON_PEFIL_TEST_ID);
    const titleHeader = screen.getByTestId(TITLE_HEADER_TEST_ID);
    const buttonSearch = screen.getByTestId(BUTTON_SEARCH_TEST_ID);

    expect(buttonProfile).toBeInTheDocument();
    expect(titleHeader).toBeInTheDocument();
    expect(buttonSearch).toBeInTheDocument();
  });
});

describe('10 - Implemente um ícone para a tela de perfil', () => {
  const hasNoHeader = () => {
    const buttonProfile = screen.queryByTestId(BUTTON_PEFIL_TEST_ID);
    const titleHeader = screen.queryByTestId(TITLE_HEADER_TEST_ID);
    const buttonSearch = screen.queryByTestId(BUTTON_SEARCH_TEST_ID);

    expect(buttonProfile).not.toBeInTheDocument();
    expect(titleHeader).not.toBeInTheDocument();
    expect(buttonSearch).not.toBeInTheDocument();
  };

  const hasHeader = (title, withSearchButton = true) => {
    const buttonProfile = screen.getByTestId(BUTTON_PEFIL_TEST_ID);
    const titleHeader = screen.getByTestId(TITLE_HEADER_TEST_ID);
    const buttonSearch = screen.getByTestId(BUTTON_SEARCH_TEST_ID);

    expect(buttonProfile).toBeInTheDocument();

    expect(titleHeader).toBeInTheDocument();
    if (withSearchButton) {
      expect(buttonSearch).toBeInTheDocument();
    } else {
      expect(buttonSearch).not.toBeInTheDocument();
    }
  };

  it('1 - Não tem header na tela de login', () => {
    const { history } = renderWithRouterAndStore(<App />);
    history.push('/Login');
    expect(history.location.pathname).toBe('/Login');

    hasNoHeader();
  });

  it('2 - O header tem os ícones corretos na tela de principal de comidas', () => {
    const { history } = renderWithRouterAndStore(<App />);
    history.push('/comidas');
    expect(history.location.pathname).toBe('/comidas');

    hasHeader();
  });

  it('3 - O header tem os ícones corretos na tela de receitas de bebidas', () => {
    const { history } = renderWithRouterAndStore(<App />);
    history.push('/bebidas');
    expect(history.location.pathname).toBe('/bebidas');

    hasHeader();
  });

  it('4 - Não tem header na tela de detalhes de uma receita de comida', () => {
    const { history } = renderWithRouterAndStore(<App />);
    history.push('/comidas/52771');
    expect(history.location.pathname).toBe('/comidas/52771');

    hasNoHeader();
  });

  it('5 - Não tem header na tela de detalhes de uma receita de bebida', () => {
    const { history } = renderWithRouterAndStore(<App />);
    history.push('/bebidas/178319');
    expect(history.location.pathname).toBe('/bebidas/178319');

    hasNoHeader();
  });

  it('6 - Não tem header na tela de receita em processo de comida', () => {
    const { history } = renderWithRouterAndStore(<App />);
    history.push('/comidas/52771/in-progress');
    expect(history.location.pathname).toBe('/comidas/52771/in-progress');

    hasNoHeader();
  });

  it('7 - Não tem header na tela de receita em processo de bebida', () => {
    const { history } = renderWithRouterAndStore(<App />);
    history.push('/bebidas/178319/in-progress');
    expect(history.location.pathname).toBe('/bebidas/178319/in-progress');

    hasNoHeader();
  });

  it('8 - O header tem os ícones corretos na tela de explorar', () => {
    const { history } = renderWithRouterAndStore(
      <Header title="Explorar" hasSearchBar />,
    );
    history.push('/explorar');
    expect(history.location.pathname).toBe('/explorar');

    hasHeader();
  });

  it('9 - O header tem os ícones corretos na tela de explorar comidas', () => {
    const { history } = renderWithRouterAndStore(
      <Header title="Explorar Comidas" hasSearchBar />,
    );
    history.push('/explorar/comidas');
    expect(history.location.pathname).toBe('/explorar/comidas');

    hasHeader();
  });

  it('10 - O header tem os ícones corretos na tela de explorar bebidas', () => {
    const { history } = renderWithRouterAndStore(
      <Header title="Explorar Bebidas" hasSearchBar />,
    );
    history.push('/explorar/bebidas');
    expect(history.location.pathname).toBe('/explorar/bebidas');

    hasHeader();
  });

  it('11 - tem os ícones corretos na tela de explorar comidas por ingrediente', () => {
    const { history } = renderWithRouterAndStore(
      <Header title="Explorar Ingredientes" hasSearchBar />,
    );
    history.push('/explorar/comidas/ingredientes');
    expect(history.location.pathname).toBe('/explorar/comidas/ingredientes');

    hasHeader();
  });

  it('12 - tem os ícones corretos na tela de explorar bebidas por ingrediente', () => {
    const { history } = renderWithRouterAndStore(
      <Header title="Explorar Ingredientes" hasSearchBar />,
    );
    history.push('/explorar/bebidas/ingredientes');
    expect(history.location.pathname).toBe('/explorar/bebidas/ingredientes');

    hasHeader();
  });

  it('13 - tem os ícones corretos na tela de explorar comidas por  origem', () => {
    const { history } = renderWithRouterAndStore(
      <Header title="Explorar Origem" hasSearchBar />,
    );
    history.push('/explorar/bebidas/area');
    expect(history.location.pathname).toBe('/explorar/bebidas/area');

    hasHeader();
  });

  it('14 - O header tem os ícones corretos na tela de perfil', () => {
    const { history } = renderWithRouterAndStore(
      <Header title="Perfil" hasSearchBar />,
    );
    history.push('/perfil');
    expect(history.location.pathname).toBe('/perfil');

    hasHeader();
  });

  it('15 - O header tem os ícones corretos na tela de receitas feitas', () => {
    const { history } = renderWithRouterAndStore(
      <Header title="Receitas Feitas" hasSearchBar />,
    );
    history.push('/receitas-feitas');
    expect(history.location.pathname).toBe('/receitas-feitas');

    hasHeader();
  });

  it('16 - O header tem os ícones corretos na tela de receitas favoritas', () => {
    const { history } = renderWithRouterAndStore(
      <Header title="Receitas Favoritas" hasSearchBar />,
    );
    history.push('/receitas-favoritas');
    expect(history.location.pathname).toBe('/receitas-favoritas');

    hasHeader();
  });
});

describe('11 - Redirecione o usuário para a tela de perfil ao clicar no botão', () => {
  it('A mudança de tela ocorre corretamente', () => {
    renderWithRouter(<Header title="Comidas" hasSearchBar />);

    const buttonProfile = screen.getByTestId(BUTTON_PEFIL_TEST_ID);
    const titleHeader = screen.getByTestId(TITLE_HEADER_TEST_ID);

    expect(titleHeader).toString('Comidas');
    userEvent.click(buttonProfile);
    expect(titleHeader).toString('Perfil');
  });
});

describe('12 - botão de busca que quando clicado a barra de busca deve aparecer.', () => {
  it('Ao clicar no botão de busca pela primeira vez a barra de busca aparece', () => {
    const { history } = renderWithRouterAndStore(<Header title="Comidas" hasSearchBar />);
    history.push('/comidas');
    expect(history.location.pathname).toBe('/comidas');
    const buttonSearch = screen.getByTestId(BUTTON_SEARCH_TEST_ID);

    expect(buttonSearch).toBeInTheDocument();
    userEvent.click(buttonSearch);
    const searchInput = screen.getByTestId(SEACH_TEST_ID);
    expect(searchInput).toBeInTheDocument();
  });

  it('Ao clicar no botão de busca pela segunda vez a barra de busca desaparece', () => {
    const { history } = renderWithRouterAndStore(<Header title="Comidas" hasSearchBar />);
    history.push('/comidas');
    expect(history.location.pathname).toBe('/comidas');

    const buttonSearch = screen.getByTestId(BUTTON_SEARCH_TEST_ID);

    expect(buttonSearch).toBeInTheDocument();
    userEvent.click(buttonSearch);

    const searchInput = screen.getByTestId(SEACH_TEST_ID);

    expect(searchInput).toBeInTheDocument();
    userEvent.click(buttonSearch);
    expect(searchInput).not.toBeInTheDocument();
  });
});
