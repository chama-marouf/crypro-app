import axios from 'axios';

const API_BASE = 'https://coingeko.burjx.com';

export const fetchAllCoins = async (page = 1, pageSize = 10) => {
  const response = await axios.get(`${API_BASE}/coin-prices-all`, {
    params: {currency: 'usd', page, pageSize},
  });
  return response.data;
};

export const fetchCoinDetails = async (productId, days = 30) => {
  const response = await axios.get(`${API_BASE}/coin-ohlc`, {
    params: {productId, days},
  });
  return response.data;
};
