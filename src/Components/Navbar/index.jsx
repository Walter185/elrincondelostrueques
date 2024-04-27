import logo from "../../Assets/Img/logo.png";
import "./Navbar.css"
import { useAuth } from "../../Context/context";
import styled from "styled-components";
import Navlink from "./Navlink";
import { useState } from "react";
import { IconButton, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";
import Hamburger from "hamburger-react";
import NavBarSearch from "./NavBarSearch";
import { Link } from "react-router-dom";


const Li = styled.li`
  list-style: none;
  display: block;
  color: black;
  text-decoration: none;
  margin-top: 5px;
  margin: 0 0.5rem;
  border-radius: 0.5rem;
  @media screen and (max-width:1000px) {
    width: 100%;
    text-align: center;
    margin: 0.2rem 0.5rem;

  }
`;

const Ul = styled.ul`
  display: flex;
  align-items: right;
  color: black;
  @media screen and (max-width:1000px) {
    display: none;
    flex-direction: column;
    width: 100% !important;
    margin-top: 267px;
    // margin-bottom: 0.25rem;
background: linear-gradient(90deg, rgba(0, 147, 216, 1) 0%, rgba(3, 173, 238, 1) 100%);
    &.open {
      display: flex;
      z-index: 5;
      padding: 20px;
      right: 0;
      top: -195px;
      position: absolute;
  }}
`;

const Pan = styled.div`
  display: none;
  width: auto;
  margin-top: -9px;
  position: relative;
 
  @media screen and (max-width:1000px) {
  display: flex;
  }
`;
const Nav = styled.div`
display: flex;
width:75%;
margin-left: 15%;
justify-content: space-around;
align-items: center;
height: 90px;
text-decoration: none;
position: sticky;
top: 0;
z-index: 1;
background: white;

@media screen and (max-width: 768px) {
  width: 100%;
  margin-left: 0%;

}
`;

const Contenedor= styled.div`
background: linear-gradient(90deg, rgba(0, 147, 216, 1) 0%, rgba(3, 173, 238, 1) 100%);
color: black;

`;

export default function NavBar(props) {
  const { logout, currentUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const { toggleColorMode } = useColorMode();


  return (
    <Contenedor>
    <Nav>
      <Link to="/" className="navbar__logo">
        <img src={logo} alt="Logo" />
      </Link>
      <NavBarSearch />
      <div>
        <Ul className={isOpen ? "open" : ""}>
          <Li>
            <Navlink to="/" name="Home" />
          </Li>
          <Li>
            {currentUser && <Navlink to="/show" name="Adm" />}
          </Li>
          <Li>
            {!currentUser && <Navlink to="/login" name="Ingresar" />}
            {currentUser && (
              <Navlink
                to="/"
                name="Salir"
                onClick={async (e) => {
                  await logout();
                }}
              />
            )}
          </Li>
          <Li>
            <IconButton
              variant="ghost"
              icon={useColorModeValue(<FaSun />, <FaMoon />)}
              onClick={toggleColorMode}
              color={"black"}
              aria-label="toggle-dark-mode"
            />
          </Li>
        </Ul>
        <Pan>
          <Hamburger name="Hamburguesa" toggled={isOpen} toggle={setIsOpen} duration={0.8} />
        </Pan>
      </div>
    </Nav>
    </Contenedor>
  );
};

