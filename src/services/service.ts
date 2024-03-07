import { ITicker } from "../interfaces/Interface";

export function getSortedCoinsByPercentChanges(coins?: ITicker[]) {
  return coins?.sort(
    (coinA, coinB) =>
      coinA.quotes.USD.percent_change_24h - coinB.quotes.USD.percent_change_24h
  );
}

export function trimDateTime(str: string) {
  return str.slice(0, 10);
}
