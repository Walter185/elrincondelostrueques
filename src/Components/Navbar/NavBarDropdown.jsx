// import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import "./NavBarDropdown.css"
import { useContext } from "react";
import { truequeContext } from "../../Context/context";

const A= styled.a`
text-decoration: none ;
font-weight:bold;
`;

const Ul=styled.ul`
    display:inline-flex;
`;

export default function NavBarDropdown () {
const { theme } = useContext(truequeContext);

  const containerStyles = {
    backgroundColor: theme === 'dark' ? '#343a40'  : '#fff',
    color: theme === 'dark' ? '#fff' : '#343a40',
};

    const categories = ["Tecnología", "Accesorios", "Salud","Belleza","Deportes","Hogar","Electrodomesticos","Herramientas","Contrucción","Moda","Juguetes","Bebés","Vehículos","Mascotas","Servicios"];
    // const {t} = useTranslation();

    return (
        <Ul className="navbar-nav me-auto mb-2 mb-lg-0" >
            <li className="nav-item dropdown">
                <A className="nav-link dropdown-toggle " style={containerStyles} href="#" data-bs-toggle="dropdown">Categorias</A>
                <ul className="dropdown-menu">
                    {/* <li><Link className="dropdown-item" to="/category/All">Todos los productos</Link></li> */}
                    {/* <hr className="mx-3"/> */}
                    {categories.map((element) => (<li key={element}><Link className="dropdown-item" to={`/category/${element}`}>{element}</Link></li>))}
                </ul>
            </li>
        </Ul>
    );
}