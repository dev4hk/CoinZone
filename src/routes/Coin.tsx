import { Link, Route, Switch, useParams } from "react-router-dom";
import styled from "styled-components";
import Price from "../components/Price";
import { useQuery } from "react-query";
import {
  fetchCoinHistory,
  fetchCoinInfo,
  fetchCoinTicker,
} from "../services/api";
import { ICoinHistory, IInfo, ITicker, Params } from "../interfaces/Interface";
import Calculator from "../components/Calculator";
import Chart from "../components/Chart";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  padding: 0px 20px;
`;

const ContentsBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: ${(props) => props.theme.contentBgColor};
  border-radius: 20px;
  margin: 10px 0px;
  height: 80vh;

  &:first-child {
    max-width: 768px;
  }
`;

const Description = styled.p`
  font-size: ${(props) => props.theme.fontSize};
  line-height: 2cap;
`;

const Overview = styled.div`
  background-color: ${(props) => props.theme.bgColor};
  display: flex;
  justify-content: space-between;
  border-radius: 10px;
  margin: 20px 0px;
  padding: 10px;
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const OverviewItemDetail = styled.span`
  text-align: center;
  padding: 7px;
  font-size: ${(props) => props.theme.fontSize};
  &:first-child {
    font-size: 14px;
  }
`;

const Subtitle = styled.h3`
  font-size: ${(props) => props.theme.subtitleFontSize};
  color: ${(props) => props.theme.accentColor};
  text-align: center;
`;

const Tab = styled.span`
  text-align: center;
  cursor: pointer;
  font-size: ${(props) => props.theme.subtitleFontSize};
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  a {
    padding: 7px 0px;
    display: block;
  }
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 2px 0px;
  gap: 10px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 550px;
  &:first-child {
    width: 550px;
  }
`;

const PERIOD_1Y = "1y";

function Coin() {
  const { coinId } = useParams<Params>();
  const { isLoading: isInfoLoading, data: infoData } = useQuery<IInfo>(
    ["info", coinId],
    () => fetchCoinInfo(coinId)
  );
  const { isLoading: isTickerLoading, data: tickerData } = useQuery<ITicker>(
    ["ticker", coinId],
    () => fetchCoinTicker(coinId)
  );
  const { isLoading: isHistoryLoading, data: historyData } = useQuery<
    ICoinHistory[]
  >(["ohlcv", coinId], () => fetchCoinHistory(coinId, PERIOD_1Y));

  const isLoading = isInfoLoading || isTickerLoading || isHistoryLoading;

  return (
    <Container>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <>
          <Wrapper>
            <ContentsBox>
              <Subtitle>{infoData?.name}</Subtitle>
              <Overview>
                <OverviewItem>
                  <OverviewItemDetail>Rank:</OverviewItemDetail>
                  <OverviewItemDetail>{infoData?.rank}</OverviewItemDetail>
                </OverviewItem>
                <OverviewItem>
                  <OverviewItemDetail>Symbol:</OverviewItemDetail>
                  <OverviewItemDetail>{infoData?.symbol}</OverviewItemDetail>
                </OverviewItem>
                <OverviewItem>
                  <OverviewItemDetail>Started At:</OverviewItemDetail>
                  <OverviewItemDetail>
                    {trimDateTime(infoData?.started_at || "")}
                  </OverviewItemDetail>
                </OverviewItem>
                <OverviewItem>
                  <OverviewItemDetail>Is Active?</OverviewItemDetail>
                  <OverviewItemDetail>
                    {infoData?.is_active ? "Yes" : "No"}
                  </OverviewItemDetail>
                </OverviewItem>
              </Overview>
              <Description>
                {infoData?.description || "Description Not Available."}
              </Description>
              <Overview>
                <OverviewItem>
                  <OverviewItemDetail>Total Supply:</OverviewItemDetail>
                  <OverviewItemDetail>
                    {tickerData?.total_supply}
                  </OverviewItemDetail>
                </OverviewItem>
                <OverviewItem>
                  <OverviewItemDetail>Max Supply:</OverviewItemDetail>
                  <OverviewItemDetail>
                    {tickerData?.max_supply}
                  </OverviewItemDetail>
                </OverviewItem>
              </Overview>
              <Calculator
                coinPrice={tickerData?.quotes.USD.price || 0}
                symbol={tickerData?.symbol || ""}
              />
              <Price tickerData={tickerData} isLoading={isLoading} />
            </ContentsBox>
          </Wrapper>
          {/* <Wrapper> */}
          {/* <ContentsBox> */}
          <Wrapper>
            <ContentsBox>
              <Chart coinId={coinId} data={historyData ?? []} />
            </ContentsBox>
          </Wrapper>
          {/* </ContentsBox> */}
          {/* </Wrapper> */}
        </>
      )}
    </Container>
  );
}

function trimDateTime(str: string) {
  return str.slice(0, 10);
}

export default Coin;
