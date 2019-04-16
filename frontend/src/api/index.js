import * as urls from '../constants/urls';

export const getProductsPerPage = (pageData) => {
  let url = new URL(urls.PRODUCTS);
  url.search = new URLSearchParams(pageData);

  return fetch(url).then(response => response.json());
};

export const getNumberOfProducts = (searchData) => {
  let url = new URL(urls.PRODUCTS_COUNT);
  url.search = new URLSearchParams(searchData);

  return fetch(url).then(response => response.json());
};

export const getDepartments = () =>
  fetch(urls.DEPARTMENTS).then(response => response.json());

export const getCategories = (filterData) => {
  let url = new URL(urls.CATEGORIES);
  url.search = new URLSearchParams(filterData);
  
  return fetch(url).then(response => response.json());
};

export const getProducts = (filterData) => {
  let url = new URL(urls.PRODUCTS);
  url.search = new URLSearchParams(filterData);

  return fetch(url).then(response => response.json());
};