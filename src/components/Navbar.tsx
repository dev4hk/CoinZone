import { faBitcoinSign, faCoins } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { isDarkAtom } from "../atom";

const Label = styled.label.attrs({ htmlFor: "checkbox" })`
  position: absolute;
  top: 0;
  left: 0;
  width: 42px;
  height: 26px;
  border-radius: 15px;
  background: ${(props) => props.theme.accentColor};
  cursor: pointer;
  &::after {
    content: "";
    display: block;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    margin: 3px;
    background: #ffffff;
    box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
    transition: 0.2s;
  }
`;

const CheckBox = styled.input.attrs({ type: "checkbox", id: "checkbox" })`
  opacity: 0;
  z-index: 1;
  border-radius: 15px;
  width: 42px;
  height: 26px;
  &:checked + ${Label} {
    background: ${(props) => props.theme.accentColor};
    &::after {
      content: "";
      display: block;
      border-radius: 50%;
      width: 18px;
      height: 18px;
      margin-left: 21px;
      transition: 0.2s;
    }
  }
`;

const Nav = styled.nav`
  background-color: black;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 1;
`;

const Title = styled.div`
  font-size: ${(props) => props.theme.subtitleFontSize};
  display: flex;
  align-items: center;
  &:hover {
    span {
      transition: all 0.2s ease-in;
      color: ${(props) => props.theme.hoverColor};
    }
  }
  span {
    margin-left: 10px;
  }
`;

const Wrapper = styled.ul`
  display: flex;
  align-items: center;
  position: relative;
`;

const NavItem = styled.li`
  margin-left: 20px;
  cursor: pointer;
  transition: all 0.2s ease-in;
  &:hover {
    color: ${(props) => props.theme.hoverColor};
  }
  &:last-child {
    margin-right: 20px;
  }
`;

function Navbar() {
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((prev) => !prev);
  return (
    <Nav>
      <Wrapper>
        <Link to="/">
          <Title>
            <FontAwesomeIcon icon={faCoins} color="gold" />
            <span>COINZONE</span>
          </Title>
        </Link>
      </Wrapper>
      <Wrapper>
        <CheckBox onClick={toggleDarkAtom} />
        <Label />
      </Wrapper>
    </Nav>
  );
}

export default Navbar;
