import { useState } from "react";
import styled from "styled-components";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const TitleDiv = styled.div`
  @media screen and (max-width: 1000px) {
    display: none;
  }
`;

const ModalDiv = styled.div`
  .title {
    color: #4a00e0;
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 16px;
  }

  .table {
    overflow: auto;

    table {
      border-collapse: collapse;
      font-size: 14px;
      width: 474px;

      th {
        font-weight: 500;
      }

      td,
      th {
        border-top: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
        text-align: center;
        padding: 10px;
      }

      tr {
        th:first-child,
        td:first-child {
          border-left: 1px solid #ddd;
        }

        th:last-child,
        td:last-child {
          border-right: 1px solid #ddd;
        }
      }
    }
  }
`;

const Table = styled.div`
  margin-top: 20px;
  @media screen and (max-width: 1000px) {
    display: none;
  }
`;
const Whatsapp=styled.a`
    width: 100px !important;
    height: 110px !important;
    padding-left: 15px;
    padding-right: 15px;
    line-height: 90px;
    right: 20%;
    background: #25d366;
    color: #FFF;
    border-radius: 70px;
    text-align: center !important;
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

const B = styled.b`
  color: red;
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
const VideoSection = styled.div`
  margin-top: 30px;
  display: flex;
  heigth: 500px;
  justify-content: space-around;
`;

export default function ItemDetail({ product }) {
  const {
    imgUrl,
    imgUrl2,
    nombreProducto,
    departamento,
    nombreVendedor,
    tel,
    categoriaDeseada,
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

  const imageData = [
    {
      label: "Image 1",
      alt: "image1",
      url: imgUrl,
    },
    {
      label: "Image 2",
      alt: "image2",
      url: imgUrl2,
    }
  ];

  const renderSlides = imageData.map((image, index) => (
    <Div key={image.alt} onClick={() => openModal(image, index)}>
      <Img src={image.url} alt={image.alt} onClick={() => closeModal()} />
    </Div>
  ));

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? imageData.length - 1 : prevIndex - 1
    );
    setCurrentImage(imageData[currentIndex].url);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === imageData.length - 1 ? 0 : prevIndex + 1
    );
    setCurrentImage(imageData[currentIndex].url);
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
              infiniteLoop={true}
              selectedItem={imageData[currentIndex]}
              onChange={setCurrentIndex}
              className="carousel-container"
            >
              {renderSlides}
            </Carousel>
          </div>

          <div className="col-sm-12 col-md-6 text-center my-4">

                <h4>{nombreProducto}</h4><br/>
                <p>El producto se encuentra en: <b>{departamento}</b></p>
                <p>Persona que realiza el trueque: <b>{nombreVendedor}</b></p>
                <p>Estoy interesado por: <b>{categoriaDeseada}</b></p>
                <p>Teléfono de contacto: <b>{tel}</b></p>
                <p>Mandame un Whatsapp y tal vez podamos ponernos de acuerdo
                  para un Trueque, haz click en el icono           
                </p>
                <Whatsapp href={`https://api.whatsapp.com/send?phone=598${tel}`} className="btn-wsp" target="_blank">
              <i className="fa fa-whatsapp icono"></i>
          </Whatsapp>
          <br/><br/>

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