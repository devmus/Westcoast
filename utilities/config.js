export const state = {
  currentPage: location.pathname,
};

export const query = {
  currentQuery: location.search.split('=')[1],
};

export const settings = {
  BASE_URL: 'http://localhost:3000',
};
