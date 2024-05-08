import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavBarSearch from "./NavBarSearch";
import NavBarDropdown from "./NavBarDropdown";
import logo from "../../Assets/Img/logo.png"
import { truequeContext, useAuth } from '../../Context/context';
import { Button } from 'react-bootstrap';
import "./Navbar.css"
import { FaMoon, FaSun } from 'react-icons/fa';
import { useContext } from 'react';

function NavScrollExample() {
  const { logout, currentUser } = useAuth();
  const { theme, toggleTheme } = useContext(truequeContext);

  const containerStyles = {
    backgroundColor: theme === 'dark' ? '#343a40'  : '#fff',
    color: theme === 'dark' ? '#fff' : '#343a40',
};

  return (
    <Navbar expand="lg" style={containerStyles}>
      <Container>
      <Nav.Link href='/'><img src={logo} id='logo' alt="logo trueque" /></Nav.Link>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <NavBarSearch />
          <Nav
            style={{ maxHeight: '250px', marginLeft:'20px'}}
            id='barra'
            >
            
            <Nav.Link href='/' style={containerStyles}>Inicio</Nav.Link>
            <NavBarDropdown />
            <span className='tema' onClick={toggleTheme}>
              {theme === 'dark'? <FaSun /> : <FaMoon />}
            </span>
            {currentUser && <Nav.Link href="/show">{currentUser.displayName}</Nav.Link>}
            {!currentUser && <Button id='botonEntrar'><Nav.Link href="/login" id="tl">Entrar</Nav.Link></Button>}
            
        

            {currentUser && (
              <Button id='boton'>
              <Nav.Link href="/"
              name="logout"
              id="tl"
              onClick={async (e) => {
                // e.preventDefaUt();
                await logout();
              }}
                >Salir</Nav.Link>
              </Button>
              )}
          </Nav>
          

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;