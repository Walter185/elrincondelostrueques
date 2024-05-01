import { useAuth } from "../../Context/context";
// import CartWidget from "./CartWidget";
import NavBarDropdown from "./NavBarDropdown";
import NavBarSearch from "./NavBarSearch";
import { IconButton, useColorMode, useColorModeValue } from "@chakra-ui/react";
import Navlink from "./Navlink";
import { FaMoon, FaSun } from "react-icons/fa";
import React, { useState } from "react";
// import NavBarLogo from "./NavBarLogo";
// import NavBarLogo2 from "./NavBarLogo2";
import styled from "styled-components";
import Hamburger from "hamburger-react";
// import { useTranslation } from "react-i18next";

const Nav = styled.nav`
  background: #343a40;
  display: flex;
  padding: 15px;
  padding-top: 20px;
  justify-content: space-between;
  text-decoration: none;
  align-items: center;
  height: 75px;
  position: sticky;
  top: 0;
  z-index: 1;  

  @media screen and (max-width:1000px) {
}
`;

const Li = styled.li`
  list-style: none;
  display: block;
  text-decoration: none;
  color: white;
  padding: 5px;
  margin: 0 0.5rem;
  border-radius: 0.5rem;
  @media screen and (max-width:1000px) {
    width: 100%;
    text-align: center;
    margin: 0.2rem 0.5rem;

  }
  &&:not(.active):hover {
  background-color: rgb(212, 57, 18);
}
`;

const Ul = styled.ul`
  display: flex;
  align-items: center;
  padding-top: 20px;
  margin-right: 10px;
  @media screen and (max-width:1000px) {
    display: none;
    flex-direction: column;
    width: 100% !important;
    margin-top: 265px;
    margin-bottom: 0.25rem;
    background-color: rgb(212, 57, 18) !important;
    &.open {
      display: flex;
      z-index: 5;
      right: 0;
      top: -195px;
      position: absolute;
  }}
`;
const ContainerNav = styled.div`
  display: flex;
  width:100%;
  padding: 10px;
  margin-left:20px;
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

export default function NavBar(props) {
  const { logout, currentUser } = useAuth();
  const { toggleColorMode } = useColorMode();
  const [isOpen, setIsOpen] = useState(false);
  // const { t } = useTranslation();

  return (
    <>
      <Nav>
        <ContainerNav>
          {/* <NavBarLogo /> */}
          {/* <NavBarLogo2 /> */}
          <NavBarSearch />
        </ContainerNav>

        <div>
          <Ul className={isOpen ? "open" : ""}>
            <Li>
              <Navlink to="/" name="home" />
            </Li>
            <Li>
              <NavBarDropdown />
            </Li>
            {/* <Li>
              <CartWidget />
            </Li> */}
            <Li>
              {currentUser && <Navlink to="/show" name="Adm" />}
            </Li>
            <Li>
              {!currentUser && <Navlink to="/login" name="login" />}
              {/* {!currentUser && <Navlink to='/register' name='Register' />} */}
              {currentUser && (
                <Navlink
                  to="/"
                  name="logout"
                  onClick={async (e) => {
                    // e.preventDefaUt();
                    await logout();
                  }}
                />
              )}
            </Li>
            <Li>
              <IconButton
                variant=""
                icon={useColorModeValue(<FaSun />, <FaMoon />)}
                onClick={toggleColorMode}
                color={"white"}
                aria-label="toggle-dark-mode"
              />
            </Li>

          </Ul>
          <Pan>
            <Hamburger title="Hamburguesa" toggled={isOpen} toggle={setIsOpen} duration={0.8} color="coral" />
          </Pan>
        </div>
      </Nav>
    </>
  );
}
