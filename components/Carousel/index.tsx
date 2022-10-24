import Carousel from 'react-bootstrap/Carousel';
import Image from 'next/image'


function CarouselComp({carouselList, isMobile}:any) {

  return (
    <Carousel>
      {
        carouselList.map((item: any, index: string )=> {
          return (
            <Carousel.Item key={item.title ? item.title + index: index}>
            <Image src={item.src} alt={item.title || ''}/>
            <Carousel.Caption>
              {item.title && !isMobile && <h3>{item.title}</h3>}
              {item.desc && !isMobile && <p>{item.desc}</p>}
            </Carousel.Caption>
          </Carousel.Item>
          )
        })
      }
    </Carousel>
  );
}

export default CarouselComp;
