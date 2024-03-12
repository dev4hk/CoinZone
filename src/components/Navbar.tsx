import { faBitcoinSign, faCoins } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import styled from "styled-components";

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
  return (
    <Nav>
      <Wrapper>
        <Link to="/">
          <Title>
            <FontAwesomeIcon icon={faBitcoinSign} color="gold" />
            <span>COINZONE</span>
          </Title>
        </Link>
      </Wrapper>
    </Nav>
  );
}

export default Navbar;
