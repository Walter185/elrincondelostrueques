// import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { styled } from "styled-components";

const A= styled.a`
color: white !important;
text-decoration: none ;
font-weight:bold;
`;

const Ul=styled.ul`
    display:inline-flex;
`;

export default function NavBarDropdown () {
    const categories = ["Cosecha", "Almacenamiento", "Preparación-Distribución","Henificacion", "Silaje","Repuestos","Manuales","Ofertas"];
    // const {t} = useTranslation();

    return (
        <Ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
                <A className="nav-link dropdown-toggle " href="#" data-bs-toggle="dropdown">"categories"</A>
                <ul className="dropdown-menu">
                    {/* <li><Link className="dropdown-item" to="/category/All">Todos los productos</Link></li> */}
                    {/* <hr className="mx-3"/> */}
                    {categories.map((element) => (<li key={element}><Link className="dropdown-item" to={`/category/${element}`}>{element}</Link></li>))}
                </ul>
            </li>
        </Ul>
    );
}