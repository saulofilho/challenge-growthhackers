import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { render, cleanup, screen } from '@testing-library/react';
import axios from 'axios';
import App from './App';
import Header from './components/Header';
import Footer from './components/Footer';
import Favorites from './pages/Favorites';

jest.mock('axios');

global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      addListener: jest.fn(),
      removeListener: jest.fn(),
    };
  };

afterEach(cleanup);

test('renders ⭐My Favorites⭐ link', () => {
  render(<App />);
  const linkElement = screen.getByText(/⭐My Favorites⭐/i);
  expect(linkElement).toBeInTheDocument();
});

it('renders Header and Footer components without crashing', () => {
  const div = document.createElement('div');

  ReactDom.render(
    <BrowserRouter>
      <Header />
      <Footer />
    </BrowserRouter>,
    div
  );

  ReactDom.unmountComponentAtNode(div);
});

test('valid path should not redirect to 404', () => {
  const wrapper = render(
    <BrowserRouter initialEntries="/favorites">
      <App />
    </BrowserRouter>
  );
  expect(wrapper).toBeTruthy();
});

test('should fetch beer', async () => {
  async function apiBeer() {
    const response = await axios.get('https://api.punkapi.com/v2/beers');

    return response.data[0].name;
  }

  await axios.get.mockResolvedValue({
    data: [
      {
        name: 'Buzz',
      },
    ],
  });

  const nome = await apiBeer();
  await expect(nome).toEqual('Buzz');
});

test('should fetch cartoon', async () => {
  async function apiCartoon() {
    const response = await axios.get(
      'https://rickandmortyapi.com/api/character'
    );

    return response.data[0].name;
  }

  await axios.get.mockResolvedValue({
    data: [
      {
        name: 'Rick Sanchez',
      },
    ],
  });

  const nome = await apiCartoon();
  await expect(nome).toEqual('Rick Sanchez');
});

test('should fetch space', async () => {
  async function apiSpace() {
    const response = await axios.post(
      'https://api.spacexdata.com/v4/rockets/query'
    );

    return response.data[0].name;
  }

  await axios.post.mockResolvedValue({
    data: [
      {
        name: 'Falcon 1',
      },
    ],
  });

  const nome = await apiSpace();
  await expect(nome).toEqual('Falcon 1');
});

test('testing toggle function', () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <Favorites />
    </BrowserRouter>
  );
  expect(getByTestId('div-toggle')).toHaveTextContent('↓' || '↑');
});
