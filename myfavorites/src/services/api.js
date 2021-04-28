import axios from 'axios';

export const api = axios.create({ baseURL: 'http://localhost:3333/' });

export const apiBeer = axios.get('https://api.punkapi.com/v2/beers');

export const apiCartoon = axios.get(
  'https://rickandmortyapi.com/api/character'
);

export const apiSpace = axios.post(
  'https://api.spacexdata.com/v4/rockets/query',
  {
    query: {},
    options: {},
  }
);
