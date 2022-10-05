import type { NextPage } from 'next'
import PageContainer from './components/PageContainer';
import CarouselComp from './Home/Carousel';
import ProductInfo from './Home/ProductInfo';



const HomeComp = () => {
  return (
    <>
      <CarouselComp />
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
