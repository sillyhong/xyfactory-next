import type { NextPage } from 'next'
import { useMemo } from 'react';
import PageContainer from '@components/PageContainer';
import CarouselComp from '@components/Carousel';
import HotProducts from '@pagerenders/Home/HotProducts';
import ProductInfo from '@pagerenders/Home/ProductInfo';
import Aboutus from '@pagerenders/Home/Aboutus';
import carousel1 from '@assets/images/carousel-1.jpg';
import carousel2 from '@assets/images/carousel-2.jpg';
import carousel3 from '@assets/images/carousel-3.jpg';
import carousel4 from '@assets/images/carousel-4.jpg';
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'


const HomeComp = () => {
  const { t} = useTranslation('common')
  const carouselList = useMemo(()=>{
    return [
      {
        src: carousel1,
        title: t('carousel.title1'),
        desc: t('carousel.desc1'),
      },
      {
        src: carousel2,
        title: t('carousel.title2'),
        desc: t('carousel.desc2'),
      },
      {
        src: carousel3,
        title: t('carousel.title3'),
        desc: t('carousel.desc3'),
      },
      {
        src: carousel4,
        title: t('carousel.title4'),
        desc: t('carousel.desc4'),
      },
    ]
   }, [t])
  return (
    <>
      <CarouselComp carouselList={carouselList} />
      <HotProducts />
      <ProductInfo />
      <Aboutus />
    </>
  );
};


const HomePage = PageContainer(HomeComp);


const Home: NextPage = (props) => {
  return (
    //  <HomePage {...props}/>
    <Aboutus />
  )
}


// Home.getInitialProps = async ({ req }: any) => {
//    const deviceAgent = req?.headers["user-agent"];
//    const isMobile = /Android|webOS|iPhone|iPod|BlackBerry/i.test(deviceAgent)
//   console.log('deviceAgent123', deviceAgent);
//   return { isMobile }
// }


export const getStaticProps = async ({ locale, ...rest }: any, ...rest2: any) => {
  // console.log('====================================');
  // console.log('req123', rest, 'rest2', rest);
  // console.log('====================================');
  // const result = await fetch('/test')

  return ({
    props: {
      ...await serverSideTranslations(locale, ['common']),
    },
  })
}


export default Home
