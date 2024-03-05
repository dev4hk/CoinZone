const BASE = "https://api.coinpaprika.com/v1";

export async function fetchCoins() {
  return fetch(`${BASE}/coins`).then((res) => res.json());
}

export async function fetchTickers() {
  return fetch(`${BASE}/tickers`).then((res) => res.json());
}

export async function fetchCoinInfo(coinId: string) {
  return fetch(`${BASE}/coins/${coinId}`).then((res) => res.json());
}

export async function fetchCoinTicker(coinId: string) {
  return fetch(`${BASE}/tickers/${coinId}`).then((res) => res.json());
}

export async function fetchCoinHistory(coinId: string, period: string) {
  const endDate = Math.floor(Date.now() / 1000);
  const startDate = endDate - 60 * 60 * 24 * 365 + 5;
  const interval = "1d";
  return fetch(
    `https://api.coinpaprika.com/v1/tickers/${coinId}/historical?start=${startDate}&end=${endDate}&interval=${interval}`
  ).then((res) => {
    return res.json();
  });
}
