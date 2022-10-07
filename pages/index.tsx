import type { NextPage } from 'next'
import { useMemo } from 'react';
import PageContainer from '@components/PageContainer';
import CarouselComp from '@components/Carousel';
import HotProducts from '@pagerenders/Home/HotProducts';
import ProductInfo from '@pagerenders/Home/ProductInfo';
import carousel1 from '@assets/images/carousel-1.jpg';
import carousel2 from '@assets/images/carousel-2.jpg';
import carousel3 from '@assets/images/carousel-3.jpg';
import carousel4 from '@assets/images/carousel-4.jpg';



const HomeComp = () => {
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
    <>
      <CarouselComp carouselList={carouselList}/>
      <HotProducts />
      <ProductInfo />
    </>
  );
};


const HomePage = PageContainer(HomeComp);


const Home: NextPage = () => {
  return (
     <HomePage/>
  )
}

export default Home
