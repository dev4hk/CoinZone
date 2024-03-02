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

function Coin() {
  const [info, setInfo] = useState({});
  const [price, setPrice] = useState({});
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
      <Title>{loading ? "Loading..." : coinId}</Title>
      <ContentsBox>
        {loading ? "loading..." : <div>Coin Detail</div>}
      </ContentsBox>
    </Container>
  );
}

export default Coin;
