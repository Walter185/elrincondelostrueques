import { useState, useEffect } from 'react';
import styled from "styled-components";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import { getUltimosProductos } from "../../Firebase/firebase";
import "./Recientes.css"


const Title = styled.h1`
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  margin-top: 30px;
  padding-bottom: 10px;
  
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

const MachineTitle = styled.h4`
  margin-top: 10px;
  margin-bottom: 5px;
  font-size: small;
  overflow: hidden;

  @media only screen and (max-width: 1000px){
  font-size: small;
  }
`;

const MachineDescription = styled.h5`
  margin-top: 10px;
  font-size:large;
  overflow: hidden;

  @media only screen and (max-width: 1500px){
    }
  @media only screen and (max-width: 800px){
  font-size:medium;
  }
`;

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

const FichaTecnicaButton = styled(Link)`
  position: absolute;
  bottom: 10px;
  right: 10px;
  text-decoration: none;

`;


export default function UltimosProductos() {
  const [products, setProducts] = useState([]);
  const [expandedImage, setExpandedImage] = useState(null);


  useEffect(() => {
    const fetchProducts = async () => {
      const productsData = await getUltimosProductos();
      setProducts(productsData);
    };

    fetchProducts();
  }, []);

  const openExpandedImage = (image) => {
    setExpandedImage(image);
  };

  const closeExpandedImage = () => {
    setExpandedImage(null);
  };
  return (
    <div>
      <Title style={{ color: "#78909c" }}>
        <b>Últimos Productos Agregados:</b>
      </Title>

      <MachineContainer>
        {products.map(producto => (
          <MachineCard key={producto.id} onClick={() => openExpandedImage(producto.imgUrl)}>
            <Carousel
              showArrows={true}
              autoPlay={true}
              showThumbs={false}
              infiniteLoop={true}
            >
              <div onClick={() => openExpandedImage(producto.imgUrl)}>
                <img className="tarjeta-img" src={producto.imgUrl} alt={producto.title} />
              </div>
              <div onClick={() => openExpandedImage(producto.imgUrl2)}>
                <img className="tarjeta-img" src={producto.imgUrl2} alt={producto.title} />
              </div>
            </Carousel>
            <MachineTitle>{producto.nombreProducto}</MachineTitle>
            <MachineDescription>Ubicación: <b>{producto.departamento}</b></MachineDescription>
            <MachineDescription>Trueco por : <b> {producto.categoriaDeseada} </b></MachineDescription>
            <br/>  <br/>
            <FichaTecnicaButton to={`/detail/${producto.id}`} className="btn btn-outline-primary">Ver más</FichaTecnicaButton>
          </MachineCard>
        ))}

        <br />
      </MachineContainer>

      <ModalContainer isOpen={expandedImage}>
        <ModalContent onClick={closeExpandedImage}>
          <img src={expandedImage} alt="Expanded" className="expanded-image" />
        </ModalContent>
      </ModalContainer>
    </div>
  );
};
