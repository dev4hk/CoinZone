import styled from "styled-components";
import { ICalculator } from "../interfaces/Interface";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowsLeftRight,
  faCalculator,
} from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  margin: 20px 0px;
`;
const Subtitle = styled.p`
  margin-top: 0;
  display: flex;
  justify-content: center;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 0px 10px;
`;
const Input = styled.input.attrs({
  type: "number",
})`
  border-radius: 5px;
  background-color: ${(props) => props.theme.bgColor};
  height: 30px;
  font-size: ${(props) => props.theme.fontSize};
  color: ${(props) => props.theme.textColor};
  padding-left: 5px;
  text-align: right;
  padding-right: 35px;
  &:focus {
    outline: none;
  }
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  @media screen and (max-width: 1024px) {
    max-width: 350px;
    &:first-child {
      margin-bottom: 10px;
    }
    &:nth-child(1) {
      margin-top: 10px;
    }
  }
`;
const Label = styled.label`
  position: absolute;
  right: 0;
  margin-right: 7px;
  color: ${(props) => props.theme.textColor};
  font-size: 13px;
`;
const InputGroups = styled.div`
  display: flex;
  justify-content: center;

  @media screen and (max-width: 720px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;
const InputGroup = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

function Calculator({ coinPrice, symbol }: ICalculator) {
  const [coinValue, setCoinValue] = useState(0);
  const [usdValue, setUsdValue] = useState(0);

  const handleChange = (value: any, isCoin: boolean) => {
    if (isCoin) {
      setCoinValue(value);
      setUsdValue(+(coinPrice * value).toFixed(6));
    } else {
      setUsdValue(value);
      setCoinValue(+(value / coinPrice).toFixed(6));
    }
  };

  return (
    <Container>
      <Subtitle>
        <FontAwesomeIcon
          icon={faCalculator}
          style={{ marginRight: "5px", color: "#9c88ff" }}
        />
        Calculate {symbol} to USD
      </Subtitle>
      <InputGroups>
        <InputGroup>
          <Input
            onChange={(e) => handleChange(e.target.value, true)}
            value={coinValue}
            id="coinValue"
          />
          <Label htmlFor="coinValue">{symbol}</Label>
        </InputGroup>
        <IconWrapper>
          <FontAwesomeIcon icon={faArrowsLeftRight} />
        </IconWrapper>
        <InputGroup>
          <Input
            onChange={(e) => handleChange(e.target.value, false)}
            value={usdValue}
            id="usdValue"
          />
          <Label htmlFor="usdValue">USD</Label>
        </InputGroup>
      </InputGroups>
    </Container>
  );
}

export default Calculator;
