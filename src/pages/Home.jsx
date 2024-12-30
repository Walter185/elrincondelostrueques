import CarrouselPrincipal from "../Components/Carousel/index";
import Banner from "../Components/Banner/Banner";
import { useContext } from "react";
import { truequeContext } from "../Context/context";
import styled from 'styled-components';
import Contador from "../Components/Contador/index";
import UltimosProductos from "../Components/Recientes/index";

const Title = styled.h1`
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  margin-top: 30px;
  `;
const Title2 = styled.h1`
margin-left: auto;
margin-right: auto;
text-align: center;
font-weight: bolder;
margin-top: 10px;

@media screen and (max-width: 768px) {
  font-weight: normal;
  
}
`;

export default function Home() {
  const { theme } = useContext(truequeContext);

  const containerStyles = {
    backgroundColor: theme === 'dark' ? '#343a40' : '#fff',
    color: theme === 'dark' ? '#fff' : '#343a40',
  };
  return (
    <div style={containerStyles}>
      <hr></hr>
      <CarrouselPrincipal />
      <Title2>El Club del Trueque ( URUGUAY )</Title2>
      <Contador /><hr></hr>
      <UltimosProductos />
      <hr></hr>
      <Title style={{ color: "#78909c" }}>
       <b>Ver Todos los Trueques</b>
      </Title>
      <div className="container-fluid pt-2 px-3">
        <div className="col-sm-12 col-md-12 col-lg-12 p-1">
          <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-12p-1">
              <Banner category="Productos" />
          </div>
          </div>
          </div>
          </div><hr></hr>
      <Title style={{ color: "#78909c" }}>
        <b>Buscar por Categorías</b>
      </Title>
      <div className="container-fluid pt-2 px-3">
        <div className="col-sm-12 col-md-12 col-lg-12 p-1">
          <div className="row">
            <div className="col-sm-6 col-md-12 col-lg-3 p-1">
              <Banner category="Tecnología" />
            </div>
            <div className="col-sm-6 col-md-4 col-lg-3 p-1">
              <Banner category="Accesorios" />
            </div>
            <div className="col-sm-6 col-md-4 col-lg-3 p-1">
              <Banner category="Salud" />
            </div>
            <div className="col-sm-6 col-md-4 col-lg-3 p-1">
              <Banner category="Belleza" />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6 col-md-4 col-lg-3 p-1">
              <Banner category="Deportes" />
            </div>
            <div className="col-sm-6 col-md-4 col-lg-3 p-1">
              <Banner category="Hogar" />
            </div>
            <div className="col-sm-6 col-md-4 col-lg-3 p-1">
              <Banner category="Electrodomesticos" />
            </div>
            <div className="col-sm-6 col-md-4 col-lg-3 p-1">
              <Banner category="Herramientas" />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6 col-md-4 col-lg-3 p-1">
              <Banner category="Contrucción" />
            </div>
            <div className="col-sm-6 col-md-4 col-lg-3 p-1">
              <Banner category="Moda" />
            </div>
            <div className="col-sm-6 col-md-4 col-lg-3 p-1">
              <Banner category="Juguetes" />
            </div>
            <div className="col-sm-6 col-md-4 col-lg-3 p-1">
              <Banner category="Bebés" />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6 col-md-4 col-lg-4 p-1">
              <Banner category="Vehículos" />
            </div>
            <div className="col-sm-6 col-md-4 col-lg-4 p-1">
              <Banner category="Mascotas" />
            </div>
            <div className="col-sm-6 col-md-4 col-lg-4 p-1">
              <Banner category="Servicios" />
            </div>
          </div>
        </div>
      </div>
      <hr></hr>
    </div>
  )
}
