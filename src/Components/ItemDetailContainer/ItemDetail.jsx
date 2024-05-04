import { useRef, useState } from "react";
import styled from "styled-components";
import "./ItemDetail.css";


const ModalContainer = styled.div`
  display: ${(props) => (props.isopen ? "block" : "none")};
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
  }

  .navigation-buttons {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0 20px;
    color: white;
  }

  .navigation-button {
    background-color: rgba(0, 0, 0, 0.5);
    border: none;
    cursor: pointer;
    padding: 10px;
    border-radius: 5px;
    font-size: 18px;
    transition: background-color 0.3s;
  }

  .navigation-button:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;


export default function ItemDetail({ product, isInCart, onAddToCart }) {
  const {
    category,
    description,
    imgUrl,
    categoriaDeseada,
    nombreProducto,
    nombreVendedor,
    tel,
    departamento
  } = product;
  const [modalOpen, setModalOpen] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentImage, setCurrentImage] = useState("");

  const openModal = (image, index) => {
    setCurrentImage(image.url);
    setCurrentIndex(index);
    setModalOpen(image);
  };

  const closeModal = () => {
    setModalOpen(null);
  };




  return (
    <>
      {product.nombreProducto && (
        <div className="container-fluid pt-2 px-3">
        <div className="col-sm-12 col-md-12 col-lg-12 p-1" id="contenedorDetail">
          <div className="row" id="subcontenedor">
            <div className="col-sm-6 col-md-6 col-lg-4 p-1">
            <img id="img1" src={imgUrl} alt={nombreProducto} />
            </div>
            <div className="col-sm-6 col-md-6 col-lg-8 text-center my-1">
              <h4>{nombreProducto}</h4><br/>
              <b>El producto se encuentra en:   {departamento}</b><br/><br/>
              <b>Persona que realiza el trueque:   {nombreVendedor}</b><br/><br/>
              <p>Teléfono de contacto: {tel}</p><br/> 
              <b>Estoy interesad@ por:</b><br/><br/>    
              <h4 id="deseado">{categoriaDeseada}</h4> 
              <br/>
              <p>Mandame un Whatsapp y tal vez podamos ponernos de acuerdo para un Trueque.</p><br/> 
            </div>
          </div>
            <br />
          </div>
       </div>
      )} 
            <ModalContainer isopen={modalOpen}>
              <ModalContent>
                <img src={currentImage} alt="Expanded" className="expanded-image" onClick={closeModal} />
                
              </ModalContent>
            </ModalContainer>
    </>
  )};
