import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Section = styled.section`
  padding-top: 10px;
  // margin-top: 30px;
  // background-color: #343a40;
  `;

const MachineContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background-color: transparent;
  `;

const MachineCard = styled.div`
  position: relative;
  width: 55%;
  margin: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  margin-bottom: 40px;
  background: var(--chakra-colors-chakra-body-bg);
  color: var(--chakra-colors-chakra-body-text);
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.8);
  &&:hover {
      box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
    }
    @media only screen and (max-width: 800px){
      font-size:medium;
      width: 100%;
      }
`;

const MachineTitle = styled.h4`
  margin-top: 10px;
  margin-bottom: 5px;
  @media only screen and (max-width: 800px){
  font-size:medium;
  }
`;

const MachineDescription = styled.h5`
  margin-top: 10px;
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

const Titulo=styled.h5`
padding: 10px;
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
      <div className="d-flex align-content-stretch">
            <div className="card card-width m-1 pb-5 text-center shadow-sm" onClick={() => openExpandedImage(imgUrl)}>
                <img className="img-product" src={imgUrl} alt={nombreProducto}/><br/>
                <p>{description}</p>
                <h4>{nombreProducto}</h4>                
                <Titulo>
                  <b>Ubicacion: {departamento}</b>              
                  <b>Trueco po: {categoriaDeseada}</b>      
                </Titulo>
               
                <Link to={`/detail/${id}`}>
                    <button className="btn btn-outline-primary position-absolute bottom-0 end-0 m-3">Ver mas</button>
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