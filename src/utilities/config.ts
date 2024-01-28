export const state: {currentPage: string} = {
  currentPage: location.pathname,
};

export const query: {currentQuery: string} = {
  currentQuery: location.search.split('=')[1],
};

export const settings: {BASE_URL: string} = {
  BASE_URL: 'http://localhost:3000',
};
