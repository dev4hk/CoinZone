import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchCoins, fetchTickers } from "../services/api";
import { ICoin, ITicker } from "../interfaces/Interface";
import { getSortedCoinsByPercentChanges } from "../services/service";
import RankList from "../components/RankList";
import CoinCard from "../components/CoinCard";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px 20px;
`;

const ContentsBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  width: 100%;
`;

const CoinsList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  padding: 0;
`;

const Rankings = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
`;

function Coins() {
  const { isLoading: isCoinsLoading, data: coinsData } = useQuery<ICoin[]>(
    "coins",
    fetchCoins,
    {
      select: (data) => data.slice(0, 100),
    }
  );

  const { isLoading: isTickersLoading, data: tickersData } = useQuery<
    ITicker[]
  >("tickers", fetchTickers, {
    select: (data) => data.slice(0, 100),
  });

  const sortedCoinsByRate = getSortedCoinsByPercentChanges(tickersData);
  const top10Overall = coinsData?.slice(0, 10);
  const top10Gainers = sortedCoinsByRate?.slice(90, 100).reverse();
  const top10Losers = sortedCoinsByRate?.slice(0, 10);
  const isLoading = isCoinsLoading || isTickersLoading;

  return (
    <Container>
      {isLoading ? (
        "loading..."
      ) : (
        <ContentsBox>
          <Rankings>
            <RankList data={top10Gainers ?? []} title="Top 10 Overall" />
            <RankList data={top10Gainers ?? []} title="Top 10 Gainers" />
            <RankList data={top10Losers ?? []} title="Top 10 Losers" />
          </Rankings>
          <CoinsList>
            {coinsData?.slice(0, 12).map((coin) => (
              <CoinCard coin={coin} key={coin.id} />
            ))}
          </CoinsList>
        </ContentsBox>
      )}
    </Container>
  );
}

export default Coins;
