import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavBarSearch from "./NavBarSearch";
import NavBarDropdown from "./NavBarDropdown";
import logo from "../../Assets/Img/logo.png";
import logoDark from "../../Assets/Img/logoDark.png";
import { truequeContext, useAuth } from '../../Context/context';
import "./Navbar.css"
import { FaMoon, FaSun } from 'react-icons/fa';
import { useContext, useEffect, useState } from 'react';
import db from '../../Firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';

function NavScrollExample() {
  const { logout, currentUser } = useAuth();
  const { theme, toggleTheme } = useContext(truequeContext);
  const [userName, setUserName] = useState('');

  const containerStyles = {
    backgroundColor: theme === 'dark' ? '#343a40'  : '#fff',
    color: theme === 'dark' ? '#fff' : '#343a40',
};

useEffect(() => {
  if (currentUser) {
    const fetchUserName = async () => {
      const userDoc = await getDoc(doc(db, "users", currentUser.uid));
      if (userDoc.exists()) {
        setUserName(userDoc.data().nombre); // Assuming 'name' is the field storing the user's name
      }
    };
    fetchUserName();
  }
}, [currentUser]);
  return (
    <Navbar expand="lg" id="barraGeneral" style={containerStyles}>
      <Container>
      <Nav.Link href='/'>
        {theme === 'dark'? <img src={logoDark} id='logo' alt="logo trueque" /> : 
        <img src={logo} id='logo' alt='logo trueque dark' /> }
      </Nav.Link>
        <Navbar.Toggle aria-controls="navbarScroll"/>
        <Navbar.Collapse id="navbarScroll" style={containerStyles}>
          <NavBarSearch/>
          <Nav id='barra'>
            <Nav.Link href='/' id="inicio" style={containerStyles}>Inicio</Nav.Link>
            <NavBarDropdown />
            <span className='tema' onClick={toggleTheme} >
              {theme === 'dark'? <FaSun /> : <FaMoon />}
            </span>
            {currentUser && <Nav.Link href="/show"  style={containerStyles}>{userName}</Nav.Link>}
            {!currentUser && <Nav.Link href="/register"  style={containerStyles}>Registrarse</Nav.Link>}
            {!currentUser && <Nav.Link href="/login"  style={containerStyles}>Ingresar</Nav.Link>}
            {currentUser && <Nav.Link href="/"
              name="logout"
              style={containerStyles}
              onClick={async (e) => {
                // e.preventDefaUt();
                await logout();
              }}
                >Salir</Nav.Link>}
          </Nav>
          

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;