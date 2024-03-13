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
const ChangeNumber = styled.span<{ $isNegative: boolean }>`
  color: ${(props) =>
    props.$isNegative ? props.theme.loseColor : props.theme.gainColor};
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
            <ChangeTitle>Change - 1h</ChangeTitle>
            <ChangeNumber $isNegative={isNegative(priceObj?.percent_change_1h)}>
              {priceObj?.percent_change_1h}%
            </ChangeNumber>
          </ChangeWrapper>
          <ChangeWrapper>
            <ChangeTitle>Change - 6h</ChangeTitle>
            <ChangeNumber $isNegative={isNegative(priceObj?.percent_change_6h)}>
              {priceObj?.percent_change_6h}%
            </ChangeNumber>
          </ChangeWrapper>
          <ChangeWrapper>
            <ChangeTitle>Change - 12h</ChangeTitle>
            <ChangeNumber
              $isNegative={isNegative(priceObj?.percent_change_12h)}
            >
              {priceObj?.percent_change_12h}%
            </ChangeNumber>
          </ChangeWrapper>
          <ChangeWrapper>
            <ChangeTitle>Change - 24h</ChangeTitle>
            <ChangeNumber
              $isNegative={isNegative(priceObj?.percent_change_24h)}
            >
              {priceObj?.percent_change_24h}%
            </ChangeNumber>
          </ChangeWrapper>
          <ChangeWrapper>
            <ChangeTitle>Change - Week</ChangeTitle>
            <ChangeNumber $isNegative={isNegative(priceObj?.percent_change_7d)}>
              {priceObj?.percent_change_7d}%
            </ChangeNumber>
          </ChangeWrapper>
          <ChangeWrapper>
            <ChangeTitle>Change - Month</ChangeTitle>
            <ChangeNumber
              $isNegative={isNegative(priceObj?.percent_change_30d)}
            >
              {priceObj?.percent_change_30d}%
            </ChangeNumber>
          </ChangeWrapper>
          <ChangeWrapper>
            <ChangeTitle>Change - Year</ChangeTitle>
            <ChangeNumber $isNegative={isNegative(priceObj?.percent_change_1y)}>
              {priceObj?.percent_change_1y}%
            </ChangeNumber>
          </ChangeWrapper>
        </>
      )}
    </Container>
  );
}
export default Price;
