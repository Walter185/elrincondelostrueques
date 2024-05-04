import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "./Card.css"


const ModalContainer = styled.div`
  display: ${(props) => (props.isOpen ? "block" : "none")};
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  // background-color: rgba(0, 0, 0, 0.7);
`;

const ModalContent = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  // background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;


function Card(props){
    const {id, nombreProducto, nombreVendedor, description, imgUrl, imgUrl2, category, categoriaDeseada, departamento} = props.product;
    const [expandedImage, setExpandedImage] = useState(null);

    const openExpandedImage = (image) => {
        setExpandedImage(image);
      };
    
      const closeExpandedImage = () => {
        setExpandedImage(null);
      };
    
    return (
      <div className="tarjeta">
            <div className="tarjeta-contenedor-img" onClick={() => openExpandedImage(imgUrl)}>
                <img className="tarjeta-img" src={imgUrl} alt={nombreProducto}/><br/>
                <p className="descripcion">{description}</p>
                <h4 id="nombreProducto">{nombreProducto}</h4>                
                <h5 id="details">
                  <b>Ubicacion: {departamento}</b>              
                  <b>Trueco po: {categoriaDeseada}</b>      
                </h5>
               
                <Link to={`/detail/${id}`}>
                    <button id="vermas">Ver Detalles</button>
                </Link>
         
            </div>
<ModalContainer isOpen={expandedImage}>
  <ModalContent onClick={closeExpandedImage}>
    <img src={expandedImage} alt="Expanded" className="expanded-image" />
  </ModalContent>
</ModalContainer>
        </div>
    );
}
      
export default Card;