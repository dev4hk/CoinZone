import { Link } from "react-router-dom";
import styled from "styled-components";
import { ITicker } from "../interfaces/Interface";

const ChangeNumber = styled.span<{ isGain: string }>`
  display: flex;
  align-items: center;
  color: ${(props) =>
    props.isGain === "true" ? props.theme.gainColor : props.theme.loseColor};
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

const Ranking = styled.div``;

const RankContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  font-size: ${(props) => props.theme.fontSize};
  cursor: pointer;
  transition: all 0.2s ease-in;
  &:hover {
    color: ${(props) => props.theme.hoverColor};
  }
`;

const Subtitle = styled.h3`
  font-size: ${(props) => props.theme.subtitleFontSize};
  color: ${(props) => props.theme.accentColor};
`;

interface RankListProps {
  data: ITicker[];
  title: string;
}

function RankList({ data, title }: RankListProps) {
  return (
    <Ranking>
      <Subtitle>{title}</Subtitle>
      {data?.map((coin) => (
        <Link to={`/${coin.id}`} key={coin.id}>
          <RankContainer key={coin.id}>
            <CoinWrapper>
              <Img
                src={`https://static.coinpaprika.com/coin/${coin.id}/logo.png`}
                alt=""
              />
              {coin.name}
            </CoinWrapper>
            <ChangeNumber
              isGain={
                coin.quotes.USD.percent_change_24h >= 0 ? "true" : "false"
              }
            >
              {coin.quotes.USD.percent_change_24h}%
            </ChangeNumber>
          </RankContainer>
        </Link>
      ))}
    </Ranking>
  );
}

export default RankList;
