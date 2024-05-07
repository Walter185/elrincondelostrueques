import { useState } from "react";
import styled from "styled-components";
import "./ItemDetail.css";

const ModalContainer = styled.div`
  display: ${(props) => (props.isopen ? "flex" : "none")};
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
`;

const ModalContent = styled.div`
  position: relative;
  max-width: 80%;
  max-height: 80%;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  overflow: hidden;
`;

const ExpandedImage = styled.img`
  width: 75%;
  height: auto;
  cursor: pointer;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 20px;
`;

export default function ItemDetail({ product }) {
  const {
    imgUrl,
    nombreProducto,
    departamento,
    nombreVendedor,
    tel,
    categoriaDeseada,
  } = product;
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState("");

  const openModal = (image) => {
    setCurrentImage(image);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      {product.nombreProducto && (
        <div className="container-fluid pt-2 px-3">
          <div className="col-sm-12 col-md-12 col-lg-12 p-1" id="contenedorDetail">
            <div className="row" id="subcontenedor">
              <div className="col-sm-6 col-md-6 col-lg-4 p-1">
                <img
                  id="img1"
                  src={imgUrl}
                  alt={nombreProducto}
                  onClick={() => openModal(imgUrl)}
                />
              </div>
              <div className="col-sm-6 col-md-6 col-lg-8 text-center my-1">
                <h4>{nombreProducto}</h4>
                <p>
                  <b>El producto se encuentra en:</b> {departamento}
                </p>
                <p>
                  <b>Persona que realiza el trueque:</b> {nombreVendedor}
                </p>
                <p>
                  <b>Teléfono de contacto:</b> {tel}
                </p>
                <p>
                  <b>Estoy interesado por:</b> {categoriaDeseada}
                </p>
                <p>
                  Mandame un Whatsapp y tal vez podamos ponernos de acuerdo
                  para un Trueque.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      <ModalContainer isopen={modalOpen} onClick={closeModal}>
        <ModalContent>
          <CloseButton onClick={closeModal}>&times;</CloseButton>
          <ExpandedImage src={currentImage} alt="Expanded" />
        </ModalContent>
      </ModalContainer>
    </>
  );
}
