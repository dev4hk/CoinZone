import { Link } from "react-router-dom";
import styled from "styled-components";
import { ICoin } from "../interfaces/Interface";

const Coin = styled.li`
  background-color: ${(props) => props.theme.accentColor};
  color: ${(props) => props.theme.bgColor};
  margin-bottom: 10px;
  font-size: ${(props) => props.theme.fontSize};
  width: 350px;
  border-radius: 15px;
  transition: all 0.2s ease-in;
  cursor: pointer;
  a {
    padding: 20px;
    display: block;
  }
  &:hover {
    border: 1px solid ${(props) => props.theme.accentColor};
    background-color: ${(props) => props.theme.bgColor};
    color: ${(props) => props.theme.hoverColor};
  }
`;

const CoinWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 30px;
`;

const Img = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 25px;
`;

interface CardProps {
  coin: ICoin;
}

function CoinCard({ coin }: CardProps) {
  return (
    <Coin key={coin.id}>
      <Link to={`/${coin.id}/price`}>
        <CoinWrapper>
          <Img
            src={`https://static.coinpaprika.com/coin/${coin.id}/logo.png`}
            alt=""
          />
          {coin.name}
        </CoinWrapper>
      </Link>
    </Coin>
  );
}
export default CoinCard;
