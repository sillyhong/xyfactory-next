import { useMemo } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Image from 'next/image'
import carousel1 from '../../../assets/images/carousel1.jpg';
import carousel2 from '../../../assets/images/carousel2.jpg';
import carousel3 from '../../../assets/images/carousel3.jpg';
import carousel4 from '../../../assets/images/carousel4.jpg';



function CarouselComp() {
   const carouselList = useMemo(()=>{
    return [
      {
        src: carousel1,
        title: 'High Quality',
        desc: 'Quality is the leading princeple in every area at Xianying.'
      },
      {
        src: carousel2,
        title: 'Brilliant Team',
        desc: 'We have advanced production equipment and a number of skillfull technical workers.'
      },
      {
        src: carousel3,
        title: 'Competitive Price',
        desc: 'As a manufacturer, we can provide you with the most affordable price.'
      },
      {
        src: carousel4,
        title: 'Fast Delivery',
        desc: 'Our factory has many automation equipment and skilled workers to meet your needs.'
      },
    ]
   }, [])

  return (
    <Carousel>
      {
        carouselList.map(item => {
          return (
            <Carousel.Item key={item.title}>
            <Image src={item.src} alt="shower hinge"/>
            <Carousel.Caption>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </Carousel.Caption>
          </Carousel.Item>
          )
        })
      }
    </Carousel>
  );
}

export default CarouselComp;
