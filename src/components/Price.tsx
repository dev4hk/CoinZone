import styled from "styled-components";
import { ITicker } from "../interfaces/Interface";

const Container = styled.div`
  padding: 5px;
`;
const ChangeWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;
const ChangeTitle = styled.span``;
const ChangeNumber = styled.span<{ isnegative: string }>`
  color: ${(props) =>
    props.isnegative === "true"
      ? props.theme.loseColor
      : props.theme.gainColor};
`;

interface PriceProps {
  tickerData?: ITicker;
  isLoading: boolean;
}

function Price({ tickerData, isLoading }: PriceProps) {
  const priceObj = tickerData?.quotes.USD;

  const isNegative = (rate?: number) => {
    return rate ? rate < 0 : false;
  };

  return (
    <Container>
      {isLoading ? (
        "Loading..."
      ) : (
        <>
          <ChangeWrapper>
            <ChangeTitle>Rate - 1h</ChangeTitle>
            <ChangeNumber
              isnegative={
                isNegative(priceObj?.percent_change_1h) ? "true" : "false"
              }
            >
              {priceObj?.percent_change_1h}%
            </ChangeNumber>
          </ChangeWrapper>
          <ChangeWrapper>
            <ChangeTitle>Rate - 6h</ChangeTitle>
            <ChangeNumber
              isnegative={
                isNegative(priceObj?.percent_change_6h) ? "true" : "false"
              }
            >
              {priceObj?.percent_change_6h}%
            </ChangeNumber>
          </ChangeWrapper>
          <ChangeWrapper>
            <ChangeTitle>Rate - 12h</ChangeTitle>
            <ChangeNumber
              isnegative={
                isNegative(priceObj?.percent_change_12h) ? "true" : "false"
              }
            >
              {priceObj?.percent_change_12h}%
            </ChangeNumber>
          </ChangeWrapper>
          <ChangeWrapper>
            <ChangeTitle>Rate - 24h</ChangeTitle>
            <ChangeNumber
              isnegative={
                isNegative(priceObj?.percent_change_24h) ? "true" : "false"
              }
            >
              {priceObj?.percent_change_24h}%
            </ChangeNumber>
          </ChangeWrapper>
          <ChangeWrapper>
            <ChangeTitle>Rate - Week</ChangeTitle>
            <ChangeNumber
              isnegative={
                isNegative(priceObj?.percent_change_7d) ? "true" : "false"
              }
            >
              {priceObj?.percent_change_7d}%
            </ChangeNumber>
          </ChangeWrapper>
          <ChangeWrapper>
            <ChangeTitle>Rate - Month</ChangeTitle>
            <ChangeNumber
              isnegative={
                isNegative(priceObj?.percent_change_30d) ? "true" : "false"
              }
            >
              {priceObj?.percent_change_30d}%
            </ChangeNumber>
          </ChangeWrapper>
          <ChangeWrapper>
            <ChangeTitle>Rate - Year</ChangeTitle>
            <ChangeNumber
              isnegative={
                isNegative(priceObj?.percent_change_1y) ? "true" : "false"
              }
            >
              {priceObj?.percent_change_1y}%
            </ChangeNumber>
          </ChangeWrapper>
        </>
      )}
    </Container>
  );
}
export default Price;
