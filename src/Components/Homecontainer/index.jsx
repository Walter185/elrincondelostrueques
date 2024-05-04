import CarrouselPrincipal from "../Carousel";
import styled from "styled-components";
import Productos from "../Productos";
import Banner from "../Banner/Banner";

const Div = styled.div`
background: linear-gradient(90deg, rgba(0, 147, 216, 1) 0%, rgba(3, 173, 238, 1) 50%);

`; 
export default function HomeContainer() {

    return (
        <Div>
            <CarrouselPrincipal />
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
            <div className="col-sm-6 col-md-6 col-lg-6 p-1">
              <Banner category="Vehículos" />
            </div>
            <div className="col-sm-6 col-md-6 col-lg-6 p-1">
              <Banner category="Servicios" />
            </div>
            </div>
          </div>
          </div> 
        </div>
        </Div>
)}
    