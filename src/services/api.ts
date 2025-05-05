import axios from 'axios';

const API_BASE = 'https://coingeko.burjx.com';

export const fetchCoins = async (page = 1, pageSize = 20) => {
  try {
    const response = await fetch(
      `${API_BASE}/coin-prices-all?currency=usd&page=${page}&pageSize=${pageSize}`,
    );
    if (!response.ok) {
      throw new Error('Failed to fetch coins');
    }
    const data = await response.json();
    // Support array, { coins: [...] }, or { data: [...] }
    if (Array.isArray(data)) return data;
    if (data && Array.isArray(data.coins)) return data.coins;
    if (data && Array.isArray(data.data)) return data.data;
    throw new Error('Unexpected coins response format');
  } catch (error) {
    console.error('Error fetching coins:', error);
    throw error;
  }
};

type OHLCData = {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
};

export const fetchCoinOHLC = async (
  productId: number,
  days: number = 30,
): Promise<OHLCData[]> => {
  try {
    const response = await fetch(
      `${API_BASE}/coin-ohlc?productId=${productId}&days=${days}`,
    );
    if (!response.ok) {
      throw new Error(
        `Failed to fetch OHLC data: ${response.status} ${response.statusText}`,
      );
    }
    const data = await response.json();
    if (!data.ohlc || !Array.isArray(data.ohlc)) {
      throw new Error('Invalid OHLC data format');
    }
    return data.ohlc;
  } catch (error) {
    console.error('Error fetching OHLC data:', error);
    return [];
  }
};

export const fetchCoinDetails = async (productId, days = 30) => {
  const response = await axios.get(`${API_BASE}/coin-ohlc`, {
    params: {productId, days},
  });
  return response.data;
};
