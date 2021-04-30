import axios from 'axios';

export const apiBeerPag = axios.create({
  baseURL: 'https://api.punkapi.com/v2/beers',
});

const fetchBeer = (pageNumber) =>
  apiBeerPag.get(`?page=${pageNumber}&per_page=10`);

// export const apiCartoon = axios.get(
//   'https://rickandmortyapi.com/api/character'
// );

// export const apiSpace = axios.post(
//   'https://api.spacexdata.com/v4/rockets/query',
//   {
//     query: {},
//     options: {},
//   }
// );
export default {
  fetchBeer,
};
