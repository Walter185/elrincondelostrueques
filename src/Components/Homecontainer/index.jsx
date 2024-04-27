import CarrouselPrincipal from "../Carousel";
import styled from "styled-components";
import Productos from "../Productos";

const Div = styled.div`
background: linear-gradient(90deg, rgba(0, 147, 216, 1) 0%, rgba(3, 173, 238, 1) 50%);

`; 
export default function HomeContainer() {

    return (
        <Div>
            <CarrouselPrincipal />
            <Productos />
        </Div>
)}
    