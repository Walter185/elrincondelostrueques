import { useState, useEffect, useContext } from 'react';
import styled from "styled-components";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import { getUltimosProductos } from "../../Firebase/firebase";
import { truequeContext } from '../../Context/context';

const Section = styled.section`
  padding-top: 40px;
`;

const Title = styled.h1`
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  font-family: 'Baloo 2', sans-serif;
  font-weight: 800;
  font-size: 3rem;
  @media only screen and (max-width: 800px){
    font-size: 2rem;
  }
`;

const MachineContainer = styled.div`
  display: flex;
  width: 90%;
  margin: auto;
  flex-wrap: wrap;
  justify-content: center;
  background-color: transparent;
`;

const MachineCard = styled.div`
  position: relative;
  width: 25%;
  margin-inline: 10px;
  padding: 15px;
  border: 1px solid #ccc;
  margin-bottom: 20px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.8);
  &&:hover {
      box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
  }
  @media only screen and (max-width: 1200px){
    width: 40%;
  }
  @media only screen and (max-width: 500px){
    width: 90%;
  }
`;

const MachineTitle = styled.h1`
  margin-top: 10px;
  margin-bottom: 5px;
  font-size:large;

  @media only screen and (max-width: 1200px){
    font-size:medium;
  }  
  @media only screen and (max-width: 500px){
    font-size: small;
  }
`;

const MachineDescription = styled.p`
  margin-top: 10px;
  font-size:large;
  @media only screen and (max-width: 1200px){
    font-size:medium;
  }
  @media only screen and (max-width: 500px){
    font-size:small;
  }
`;

// const MachinePrice = styled.p`
//   font-weight: 900;
//   font-family: Roboto, Sans Serif;
//   margin-top: 30px;
//   margin-left: 20px;
//   margin-bottom: 30px;
//   font-size:larger;
//   @media only screen and (max-width: 1200px){
//     font-size:large;
//   }
//   @media only screen and (max-width: 500px){
//     font-size:medium;
//   }
// `;

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
  }
  `;

const FichaTecnicaButton = styled(Link)`
  position: absolute;
  bottom: 15px;
  right: 15px;
  text-decoration: none;
  &:hover {
    box-shadow: 0 0 10px rgba(245, 245, 245, 0.8);
    background-color: whitesmoke;
  }
`;

export default function UltimosProductos() {
  const [products, setProducts] = useState([]);
  const [expandedImage, setExpandedImage] = useState(null);
  const { theme } = useContext(truequeContext);

  const containerStyles = {
    backgroundColor: theme === 'dark' ? '#343a40' : '#fff',
    color: theme === 'dark' ? '#fff' : '#343a40',
  };

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
    <Section id='ofertas' style={containerStyles}>
      <Title style={{ color: "#78909c" }}>
        <b>Últimos Productos Agregados:</b>
      </Title>

      <MachineContainer>
        {products.map(producto => (
          <MachineCard key={producto.id}>
            <Carousel
              showArrows={true}
              autoPlay={true}
              showThumbs={false}
              infiniteLoop={true}
            >
              {producto.imgUrls.map((url, index) => (
                <div key={index} onClick={() => openExpandedImage(url)}>
                  <img className="tarjeta-img" src={url} alt={`imagen-${index}`} />
                </div>
              ))}
            </Carousel>
            <MachineTitle>{producto.nombreProducto}</MachineTitle>
            <MachineDescription>Ubicación: <b>{producto.departamento}</b></MachineDescription>
            <MachineDescription>Trueco por : <b>{producto.categoriaDeseada}</b></MachineDescription>
            <br /> <br />
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
    </Section>);
};
