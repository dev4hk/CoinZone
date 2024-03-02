import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
      console.log(info);
      console.log(price);
    })();
  }, []);

  return (
    <Container>
      <Title>{loading ? "Loading..." : coinId}</Title>
      <ContentsBox>
        {loading ? "loading..." : <div>Coin Detail</div>}
      </ContentsBox>
    </Container>
  );
}

export default Coin;
