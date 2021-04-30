import axios from 'axios';

export const apiBeerPag = axios.create({
  baseURL: 'https://api.punkapi.com/v2/beers',
});

export const apiCartoonPag = axios.create({
  baseURL: 'https://rickandmortyapi.com/api/character',
});

const fetchBeer = (pageNumber) =>
  apiBeerPag.get(`?page=${pageNumber}&per_page=10`);

const fetchCartoon = (pageNumber) => apiCartoonPag.get(`?page=${pageNumber}`);

export default {
  fetchBeer,
  fetchCartoon,
};
