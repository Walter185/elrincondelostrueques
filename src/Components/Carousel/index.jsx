import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useState } from "react";
import img1 from "../../Assets/Img/chica-con-celular.jpg";
import img2 from "../../Assets/Img/compra-en-casa.jpg";
import img3 from "../../Assets/Img/trato-hecho.jpg";
import sponsor1 from "../../Assets/Img/sponsor1.jpg";
// import sponsormp from "../../Assets/Img/sponsormp.jpg";
import "./Carousel.css"

export default function CarrouselPrincipal() {
  const [currentIndex, setCurrentIndex] = useState();
  function handleChange(index) {
    setCurrentIndex(index);
  }
  const imageData = [
    {
      label: "Trueque Uruguay",
      alt: "Trueque Uruguay",
      src: img1,
    },
    {
      label: "Trueque Uruguay",
      alt: "Trueque Uruguay",
      src: img2,
    },
    {
      label: "Trueque Uruguay",
      alt: "Trueque Uruguay",
      src: img3,
    },
  ];

  const renderSlides = imageData.map((image) => (
    <div key={image.alt}>
      <img className="calesita" src={image.src} alt={image.alt} />
    </div>
  ));

  return (
    <>
      <div className="my-1" id="contenedorCalesita">
        <div className="col-sm-12 col-md-12 col-lg-12 p-1">
          <div className="row">
            <div className="col-sm-0 col-md-2 col-lg-2 p-1">
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
              <a href="https://mainero.uy/"  target="_blank" rel="noreferrer"><img className="Img" src={sponsor1} alt="Mainero"></img></a>
            </div>
   
          </div>
        </div>
      </div>
    </>
  );
}
