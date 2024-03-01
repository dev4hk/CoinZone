import { Link } from "react-router-dom";
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
    color: ${(props) => props.theme.textColor};
  }
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

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  return (
    <Container>
      <Title>Explore Coins!</Title>
      <Subtitle>Click Coin(s) You Are Interested To See More Info</Subtitle>
      <ContentsBox>
        <CoinsList>
          {coins.map((coin) => (
            <Coin key={coin.id}>
              <Link to={`/${coin.id}`}>{coin.name}</Link>
            </Coin>
          ))}
        </CoinsList>
        <Rankings>Rankings box</Rankings>
      </ContentsBox>
    </Container>
  );
}

export default Coins;
