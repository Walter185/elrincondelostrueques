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

@media screen and (max-width: 1200px) {
  height: 300px;

} 
@media screen and (max-width: 800px) {
  height: 250px;
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
      <div className="my-1">
      <div className="col-sm-12 col-md-12 col-lg-12 p-1">
        <div className="row">
        <div className="col-sm-0 col-md-2 col-lg-2 p-1">
        <img src="#" alt="" />
              <p>Publicidad</p>
        </div>
          <div className="col-sm-12 col-md-8 col-lg-8 p-1">
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
            <div className="col-sm-0 col-md-2 col-lg-2 p-1">
              <img src="#" alt="" />
              <p>Publicidad</p>
            </div>
      </div>
      </div>
      </div>
    </>
  );
}
