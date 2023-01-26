import Carousel from 'react-bootstrap/Carousel';
import * as React from 'react';

function AdCarousel({ images, specie }) {
  return (
    <Carousel fade>
      {images
        ? images.map((image) => (
            <Carousel.Item>
              <img
                className="d-block carousel"
                src={image}
                alt={'Bird Image'}
              />
              {/* <Carousel.Caption>
                <h3
                  style={{
                    color: '#13274F',
                    fontSize: '3rem',
                    fontFamily: 'Alfa Slab One',
                  }}
                >
                  {specie}
                </h3>
              </Carousel.Caption> */}
            </Carousel.Item>
          ))
        : null}
    </Carousel>
  );
}

export default AdCarousel;
