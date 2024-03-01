import styled from "styled-components";

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
  display: flex;
  flex-direction: row;
  justify-content: space-around;
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
  padding: 20px;
  font-size: ${(props) => props.theme.fontSize};
`;

const coins = [
  {
    id: "btc-bitcoin",
    name: "Bitcoin",
    symbol: "BTC",
    rank: 1,
    is_new: false,
    is_active: true,
    type: "coin",
  },
  {
    id: "eth-ethereum",
    name: "Ethereum",
    symbol: "ETH",
    rank: 2,
    is_new: false,
    is_active: true,
    type: "coin",
  },
];

function Coins() {
  return (
    <Container>
      <Title>Explore Coins!</Title>
      <Subtitle>Click Coin(s) You Are Interested To See More Info</Subtitle>
      <ContentsBox>
        <CoinsList>
          {coins.map((coin) => (
            <Coin key={coin.id}>{coin.name}</Coin>
          ))}
        </CoinsList>
        <Rankings>Rankings box</Rankings>
      </ContentsBox>
    </Container>
  );
}

export default Coins;
