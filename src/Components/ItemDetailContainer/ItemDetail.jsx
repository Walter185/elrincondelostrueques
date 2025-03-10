import { useState } from "react";
import styled from "styled-components";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const Whatsapp = styled.a`
    width: 90px;
    height: 70px;
    padding-left: 17px;
    padding-right: 15px;
    right: 20%;
    background: #25d366;
    color: #FFF;
    border-radius: 75px;
    text-align: center;
    font-size: 55px;
    box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.3);
    transition: all 300ms ease;
  &&:hover {
    background: #FFF;
    color: #25D366;
  }
`;

const Div = styled.div`
  margin-top: 10px;
`;

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
    cursor: pointer;
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
    background-color: grey;
    border: none;
    padding: 10px;
    border-radius: 5px;
    font-size: 18px;
    transition: background-color 0.3s;
  }

  .navigation-button:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

const Img = styled.img`
  margin: auto;
  max-width: 500px;
  max-height: 400px;
  object-fit: contain;
  cursor: pointer;
`;

export default function ItemDetail({ product }) {
  const {
    imgUrls,
    nombreProducto,
    description,
    departamento,
    nombreVendedor,
    tel,
    timestamp
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

  const renderSlides = imgUrls.map((url, index) => (
    <Div key={index} onClick={() => openModal({ url }, index)}>
      <Img src={url} alt={`image${index}`} onClick={() => closeModal()} />
    </Div>
  ));

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? imgUrls.length - 1 : prevIndex - 1
    );
    setCurrentImage(imgUrls[currentIndex]);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === imgUrls.length - 1 ? 0 : prevIndex + 1
    );
    setCurrentImage(imgUrls[currentIndex]);
  };

  return (
    <>
      {product.nombreProducto && (
        <div className="container my-1">
          <div className="row item-detail">
            <div className="col-sm-12 col-md-6">
              <Carousel
                showArrows={true}
                autoPlay={true}
                showThumbs={false}
                infiniteLoop={true}
                selectedItem={currentIndex}
                onChange={setCurrentIndex}
                className="carousel-container"
              >
                {renderSlides}
              </Carousel>
            </div>

            <div className="col-sm-12 col-md-6 text-center my-4">
              <h4>{nombreProducto}</h4><br />
              <p>{description}</p>
              <p>El producto se encuentra en: <b>{departamento}</b></p>
              <p>Persona que realiza el trueque: <b>{nombreVendedor}</b></p>
              {/* <p>Estoy interesado por: <b>{categoriaDeseada}</b></p> */}
              <p>Teléfono de contacto: <b>{tel}</b></p>
              <p>Mandame un Whatsapp y tal vez podamos ponernos de acuerdo
                para un Trueque, haz click en el icono           
              </p>
              <Whatsapp href={`https://api.whatsapp.com/send?phone=598${tel}`} className="btn-wsp" target="_blank">
              <i class="fa fa-whatsapp" aria-hidden="true"></i>
              </Whatsapp>
              <br /><br />
              <p>Fecha de la publicación: {timestamp}</p>
            </div>
          </div>
        </div>
      )}
      <ModalContainer isopen={modalOpen}>
        <ModalContent>
          <img src={currentImage} alt="Expanded" className="expanded-image" onClick={closeModal} />
          <div className="navigation-buttons">
            <button
              className="navigation-button"
              onClick={handlePrevious}
            >
              &lt; Anterior
            </button>
            <button className="navigation-button" onClick={handleNext}>
              Siguiente &gt;
            </button>
          </div>
        </ModalContent>
      </ModalContainer>
    </>
  );
}
