import { Link, Route, Switch, useParams } from "react-router-dom";
import styled from "styled-components";
import Price from "./Price";
import Chart from "./Chart";
import { useQuery } from "react-query";
import { fetchCoinInfo, fetchCoinTicker } from "../services/api";
import { IInfo, ITicker, Params } from "../interfaces/Interface";

const Container = styled.div`
  display: flex;
  height: 90vh;
  justify-content: space-around;
  align-items: center;
  padding: 0px 20px;
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

const Description = styled.p`
  font-size: ${(props) => props.theme.fontSize};
  line-height: 2cap;
`;

const ContentsBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 40vw;
  background-color: ${(props) => props.theme.contentBgColor};
  border-radius: 20px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 2px 0px;
  gap: 10px;
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

  return (
    <Container>
      {isInfoLoading || isTickerLoading ? (
        <h2>Loading...</h2>
      ) : (
        <>
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
            <Description>{infoData?.description}</Description>
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
          </ContentsBox>
          <ContentsBox>
            <Tabs>
              <Tab>
                <Link to={`/${coinId}/price`}>Price</Link>
              </Tab>
              <Tab>
                <Link to={`/${coinId}/chart`}>Chart</Link>
              </Tab>
            </Tabs>
            <Switch>
              <Route path={`/:coinId/price`}>
                <Price />
              </Route>
              <Route path={`/:coinId/chart`}>
                <Chart />
              </Route>
            </Switch>
          </ContentsBox>
        </>
      )}
    </Container>
  );
}

function trimDateTime(str: string) {
  return str.slice(0, 10);
}

export default Coin;
