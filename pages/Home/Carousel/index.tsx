import Carousel from 'react-bootstrap/Carousel';
import Image from 'next/image'
import carousel1 from '../../../assets/images/carousel1.png';
import carousel2 from '../../../assets/images/carousel2.svg';
import carousel3 from '../../../assets/images/carousel3.png';

function CarouselComp() {
  return (
    <Carousel>
      <Carousel.Item>
        <Image src={carousel1} alt="shower hinge" />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image src={carousel2} alt="shower hinge" />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image src={carousel3} alt="shower hinge" />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselComp;
