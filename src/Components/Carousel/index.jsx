import "react-responsive-carousel/lib/styles/carousel.min.css"
import styled from "styled-components"
import { Carousel } from "react-responsive-carousel"
import { useState } from "react"
import img1 from "../../Assets/Img/chica-con-celular.jpg"
import img2 from "../../Assets/Img/compra-en-casa.jpg"
import img3 from "../../Assets/Img/trato-hecho.jpg"

const Img = styled.img`
height: 350px;
object-fit: fill;
position: initial;

@media screen and (max-width: 768px) {
  object-fit: fill;
  height: 250px;

}  
`;

const Div = styled.div`
width:75%;
margin-left: 15%;
margin-top: -0.2px !important;
@media screen and (max-width: 768px) {
  width: 100%;
  margin-left: 0%;

}  
`;

export default function CarrouselPrincipal() {
  const [currentIndex, setCurrentIndex] = useState();
  function handleChange(index) {
    setCurrentIndex(index);
  }
  const imageData = [
    {
      label: "Trueque Uruguay",
      alt: "Trueque Uruguay",
      src: img1
    },
    {
      label: "Trueque Uruguay",
      alt: "Trueque Uruguay",
      src: img2
    },
    {
      label: "Trueque Uruguay",
      alt: "Trueque Uruguay",
      src:  img3
    }
  ];

  const renderSlides = imageData.map((image) => (
    <div key={image.alt}>
      <Img src={image.src} alt={image.alt} />
    </div>
  ));

  return (
    <>
      <Div className="my-1">
        <div>
          <Carousel
            showArrows={true}
            showThumbs={false}
            autoPlay={true}
            infiniteLoop={true}
            className="carousel-container"
            selectedItem={imageData[currentIndex]}
            onChange={handleChange}
          >
            {renderSlides}
          </Carousel>
        </div>
      </Div>
    </>
  );
}
