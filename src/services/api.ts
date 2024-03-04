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

export async function fetchCoinHistory(coinId: string) {
  return fetch(
    `https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`
  ).then((res) => res.json());
}
