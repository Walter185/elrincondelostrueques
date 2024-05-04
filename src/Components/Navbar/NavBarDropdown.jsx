// import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import "./NavBarDropdown.css"

const A= styled.a`
text-decoration: none ;
font-weight:bold;
`;

const Ul=styled.ul`
    display:inline-flex;
`;

export default function NavBarDropdown () {
    const categories = ["Tecnología", "Accesorios", "Salud","Belleza","Deportes","Hogar","Electrodomesticos","Herramientas","Contrucción","Moda","Juguetes","Bebés","Vehículos","Servicios"];
    // const {t} = useTranslation();

    return (
        <Ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
                <A className="nav-link dropdown-toggle " href="#" data-bs-toggle="dropdown">Categorias</A>
                <ul className="dropdown-menu">
                    {/* <li><Link className="dropdown-item" to="/category/All">Todos los productos</Link></li> */}
                    {/* <hr className="mx-3"/> */}
                    {categories.map((element) => (<li key={element}><Link className="dropdown-item" to={`/category/${element}`}>{element}</Link></li>))}
                </ul>
            </li>
        </Ul>
    );
}