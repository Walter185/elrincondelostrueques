import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "./Card.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";


const ModalContainer = styled.div`
  display: ${(props) => (props.isOpen ? "block" : "none")};
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
`;

const ModalContent = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;

   .expanded-image {
    max-width: 95%;
    max-height: 95%;
    cursor: pointer;
  }
`;
const MachineTitle = styled.h4`
  margin-top: 10px;
  margin-bottom: 5px;
  font-size: small;
    text-align: center;
  @media only screen and (max-width: 1000px){
  font-size: small;
  overflow: hidden;

  }
`;
const MachineDescription = styled.h5`
  margin-top: 10px;
  overflow: hidden;
  font-size:large;
  @media only screen and (max-width: 1500px){
    }
  @media only screen and (max-width: 800px){
  font-size:medium;
  }
`;
const FichaTecnicaButton = styled(Link)`
  position: absolute;
  bottom: 10px;
  right: 10px;
  text-decoration: none;

`;
const MachineContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background-color: transparent;
  `;
const MachineCard = styled.div`
  position: relative;
  max-width: 250px;
  margin-inline-end: 10px;
  max-height: 500px;
  padding-left: 15px;
   padding-right: 20px;
    margin-bottom: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  &&:hover {
      box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
    }
    @media only screen and (max-width: 800px){
      font-size:medium;
      }
`;
function Card(props) {
  const { id, nombreProducto, imgUrl, imgUrl2, categoriaDeseada, departamento } = props.product;
  const [expandedImage, setExpandedImage] = useState(null);

  const openExpandedImage = (image) => {
    setExpandedImage(image);
  };

  const closeExpandedImage = () => {
    setExpandedImage(null);
  };

  return (
    <div>
      <MachineContainer>
        <MachineCard>
          <Carousel
            showArrows={true}
            autoPlay={true}
            showThumbs={false}
            infiniteLoop={true}
          >
            <div onClick={() => openExpandedImage(imgUrl)}>
              <img className="tarjeta-img" src={imgUrl} alt={nombreProducto} />
            </div>
            <div onClick={() => openExpandedImage(imgUrl2)}>
              <img className="tarjeta-img" src={imgUrl2} alt={nombreProducto} />
            </div>
          </Carousel>
          <MachineTitle>{nombreProducto}</MachineTitle>
          <MachineDescription>Ubicacion: {departamento}</MachineDescription>
          <MachineDescription>Trueco por: {categoriaDeseada}</MachineDescription>
          <br />  <br />
          <FichaTecnicaButton to={`/detail/${id}`} className="btn btn-outline-primary">Ver más</FichaTecnicaButton>
        </MachineCard>
      </MachineContainer>
      <ModalContainer isOpen={expandedImage}>
        <ModalContent onClick={closeExpandedImage}>
          <img src={expandedImage} alt="Expanded" className="expanded-image" />
        </ModalContent>
      </ModalContainer>
    </div>
  );
}

export default Card;