import { Link } from "react-router-dom";
import styled from "styled-components";
import { ICoin, ITicker } from "../interfaces/Interface";

const ChangeNumber = styled.span<{ isgain: string }>`
  display: flex;
  align-items: center;
  color: ${(props) =>
    props.isgain === "true" ? props.theme.gainColor : props.theme.loseColor};
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

const Index = styled.div`
  width: 30px;
`;

const RankContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  font-size: ${(props) => props.theme.fontSize};
  cursor: pointer;
  &:hover span {
    transition: all 0.2s ease-in;
    color: ${(props) => props.theme.hoverColor};
  }
`;

const RankWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 350px;
  background-color: ${(props) => props.theme.contentBgColor};
  border-radius: 20px;
  margin: 10px 0px;
`;

const Subtitle = styled.h3`
  font-size: ${(props) => props.theme.subtitleFontSize};
  color: ${(props) => props.theme.accentColor};
`;

interface RankListOverallProps {
  data: ICoin[];
  title: string;
}

function RankListOverall({ data, title }: RankListOverallProps) {
  return (
    <RankWrapper>
      <Subtitle>{title}</Subtitle>
      {data?.map((coin, index) => (
        <Link to={`/${coin.id}`} key={coin.id}>
          <RankContainer>
            <CoinWrapper>
              <Index>{index + 1}.</Index>
              <Img
                src={`https://static.coinpaprika.com/coin/${coin.id}/logo.png`}
                alt=""
              />
              <span>{coin.name}</span>
            </CoinWrapper>
          </RankContainer>
        </Link>
      ))}
    </RankWrapper>
  );
}

export default RankListOverall;
