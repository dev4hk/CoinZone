import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins, fetchTickers } from "../services/api";
import { ICoin, IInfo, ITicker } from "../interfaces/Interface";
import { getSortedCoinsByPercentChanges } from "../services/service";
import RankList from "../components/RankList";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px 20px;
`;

const Title = styled.h1`
  font-size: ${(props) => props.theme.titleFontSize};
  color: ${(props) => props.theme.accentColor};
`;

const Subtitle = styled.h3`
  font-size: ${(props) => props.theme.subtitleFontSize};
  color: ${(props) => props.theme.accentColor};
`;

const ContentsBox = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  padding: 20px;
`;

const CoinsList = styled.ul``;

const Rankings = styled.div`
  padding: 20px;
`;

const Coin = styled.li`
  background-color: ${(props) => props.theme.accentColor};
  color: ${(props) => props.theme.bgColor};
  margin-bottom: 10px;
  font-size: ${(props) => props.theme.fontSize};
  width: 350px;
  border-radius: 15px;
  transition: all 0.2s ease-in;
  a {
    padding: 20px;
    display: block;
  }
  &:hover {
    cursor: pointer;
    border: 1px solid ${(props) => props.theme.accentColor};
    background-color: ${(props) => props.theme.bgColor};
    color: ${(props) => props.theme.hoverColor};
  }
`;

const Img = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 25px;
`;

const CoinWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 30px;
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

  const sortedCoins = getSortedCoinsByPercentChanges(tickersData);
  const top10Gainers = sortedCoins?.slice(90, 100).reverse();
  const top10Losers = sortedCoins?.slice(0, 10);

  const isLoading = isCoinsLoading || isTickersLoading;

  return (
    <Container>
      <Title>Explore Coins!</Title>
      <Subtitle>Click Coin(s) You Are Interested To See More Info</Subtitle>
      {isLoading ? (
        "loading..."
      ) : (
        <ContentsBox>
          <CoinsList>
            {coinsData?.map((coin) => (
              <Coin key={coin.id}>
                <Link to={`/${coin.id}`}>
                  <CoinWrapper>
                    <Img
                      src={`https://static.coinpaprika.com/coin/${coin.id}/logo.png`}
                      alt=""
                    />
                    {coin.name}
                  </CoinWrapper>
                </Link>
              </Coin>
            ))}
          </CoinsList>
          <Rankings>
            <RankList data={top10Gainers ?? []} title="Top 10 Gainers" />
            <RankList data={top10Losers ?? []} title="Top 10 Losers" />
          </Rankings>
        </ContentsBox>
      )}
    </Container>
  );
}

export default Coins;
