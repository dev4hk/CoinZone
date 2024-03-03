import { useEffect, useState } from "react";
import { Link, Route, Switch, useParams } from "react-router-dom";
import styled from "styled-components";
import Price from "./Price";
import Chart from "./Chart";

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

interface Params {
  coinId: string;
}

interface IInfo {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface IPrice {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

function Coin() {
  const [info, setInfo] = useState<IInfo>();
  const [price, setPrice] = useState<IPrice>();
  const [loading, setLoading] = useState(true);
  const { coinId } = useParams<Params>();
  useEffect(() => {
    (async () => {
      const info = await fetch(
        `https://api.coinpaprika.com/v1/coins/${coinId}`
      );
      const price = await fetch(
        `https://api.coinpaprika.com/v1/tickers/${coinId}`
      );
      const jsonInfo = await info.json();
      const jsonPrice = await price.json();
      setInfo(jsonInfo);
      setPrice(jsonPrice);
      setLoading(false);
    })();
  }, []);

  return (
    <Container>
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <>
          <ContentsBox>
            <Subtitle>{info?.name}</Subtitle>
            <Overview>
              <OverviewItem>
                <OverviewItemDetail>Rank:</OverviewItemDetail>
                <OverviewItemDetail>{info?.rank}</OverviewItemDetail>
              </OverviewItem>
              <OverviewItem>
                <OverviewItemDetail>Symbol:</OverviewItemDetail>
                <OverviewItemDetail>{info?.symbol}</OverviewItemDetail>
              </OverviewItem>
              <OverviewItem>
                <OverviewItemDetail>Started At:</OverviewItemDetail>
                <OverviewItemDetail>
                  {trimDateTime(info?.started_at || "")}
                </OverviewItemDetail>
              </OverviewItem>
              <OverviewItem>
                <OverviewItemDetail>Is Active?</OverviewItemDetail>
                <OverviewItemDetail>
                  {info?.is_active ? "Yes" : "No"}
                </OverviewItemDetail>
              </OverviewItem>
            </Overview>
            <Description>{info?.description}</Description>
            <Overview>
              <OverviewItem>
                <OverviewItemDetail>Total Supply:</OverviewItemDetail>
                <OverviewItemDetail>{price?.total_supply}</OverviewItemDetail>
              </OverviewItem>
              <OverviewItem>
                <OverviewItemDetail>Max Supply:</OverviewItemDetail>
                <OverviewItemDetail>{price?.max_supply}</OverviewItemDetail>
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
