import { useContext } from "react";
import styled from "styled-components";
import { truequeContext } from "../../Context/context";

const Footer = styled.footer`
    width: 100%;
    margin: auto;
    padding-top: 40px;
    margin-top: 5px;
    padding: 20px 0;
    text-align: center;
    letter-spacing: 1px;
    `;
const P=styled.p`
    font-size: 11px;
    // color: white;
`;
const A=styled.a`
    // color: white;
    text-decoration: none;
    position: relative;
`;

export function Foot() {
    const { theme } = useContext(truequeContext);

const containerStyles = {
        backgroundColor: theme === 'dark' ? '#343a40'  : '#fff',
        color: theme === 'dark' ? '#fff' : '#343a40',
};
    return (
        <Footer style={containerStyles}>
            <P>El Club del Trueque | Uruguay <br/>
            <small>Todos los derechos reservados&nbsp;&copy;2024</small>| <A href="https://api.whatsapp.com/send?phone=5491158465481" target="_blank">Desarrollado por Walter Liendo. Un ciudadano de la Comunidad para la Comunidad
            </A></P>
        </Footer>
    );
}