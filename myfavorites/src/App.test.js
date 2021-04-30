import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
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
