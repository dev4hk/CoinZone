import styled from "styled-components";
import { trimDateTime } from "../services/service";
import { IInfo } from "../interfaces/Interface";

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

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.bgColor};
  display: flex;
  justify-content: space-between;
  border-radius: 10px;
  margin: 20px 0px;
  padding: 10px;
`;

interface OverviewProps {
  data?: IInfo;
}

function Overview({ data }: OverviewProps) {
  return (
    <Wrapper>
      <OverviewItem>
        <OverviewItemDetail>Rank:</OverviewItemDetail>
        <OverviewItemDetail>{data?.rank}</OverviewItemDetail>
      </OverviewItem>
      <OverviewItem>
        <OverviewItemDetail>Symbol:</OverviewItemDetail>
        <OverviewItemDetail>{data?.symbol}</OverviewItemDetail>
      </OverviewItem>
      <OverviewItem>
        <OverviewItemDetail>Started At:</OverviewItemDetail>
        <OverviewItemDetail>
          {trimDateTime(data?.started_at || "")}
        </OverviewItemDetail>
      </OverviewItem>
      <OverviewItem>
        <OverviewItemDetail>Is Active?</OverviewItemDetail>
        <OverviewItemDetail>
          {data?.is_active ? "Yes" : "No"}
        </OverviewItemDetail>
      </OverviewItem>
    </Wrapper>
  );
}

export default Overview;
