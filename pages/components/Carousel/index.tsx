import Carousel from 'react-bootstrap/Carousel';
import Image from 'next/image'


function CarouselComp({carouselList}:any) {

  return (
    <Carousel>
      {
        carouselList.map((item: any, index: string )=> {
          return (
            <Carousel.Item key={item.title + index}>
            <Image src={item.src} alt={item.title || ''}/>
            <Carousel.Caption>
              {item.title && <h3>{item.title}</h3>}
              {item.desc && <p>{item.desc}</p>}
            </Carousel.Caption>
          </Carousel.Item>
          )
        })
      }
    </Carousel>
  );
}

export default CarouselComp;
