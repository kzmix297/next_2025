"use client";

import { Carousel, Image } from "react-bootstrap";

function CarouselApp(props) {
  const { variant } = props;
  const { src } = props;
  return (
    <Carousel variant={variant}>
      {src.map((item, index) =>
        item === "" ? null : (
          <Carousel.Item key={index}>
            <Image width={400} height={400} alt="test" src={item} rounded />
          </Carousel.Item>
        )
      )}
    </Carousel>
  );
}

export default CarouselApp;
