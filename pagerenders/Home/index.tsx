import React from 'react';
import PageContainer from '../../components/PageContainer';
import CarouselComp from '../../components/Carousel';
import ProductInfo from './ProductInfo';

// 导入轮播图片
import carousel1 from '../../assets/images/carousel-1.jpg';
import carousel2 from '../../assets/images/carousel-2.jpg';
import carousel3 from '../../assets/images/carousel-3.jpg';
import carousel4 from '../../assets/images/carousel-4.jpg';

import 'bootstrap/dist/css/bootstrap.min.css';

// 轮播图配置
const carouselData = [
  {
    src: carousel1,
    title: '专业五金制造商',
    desc: '20年专业经验，为您提供高品质的门窗五金配件'
  },
  {
    src: carousel2,
    title: '品质保证',
    desc: '严格的质量控制体系，每一个产品都经过精心检验'
  },
  {
    src: carousel3,
    title: '创新设计',
    desc: '持续的技术创新，引领行业发展趋势'
  },
  {
    src: carousel4,
    title: '全球服务',
    desc: '覆盖全球的销售网络，为客户提供及时专业的服务'
  }
];

const HomeComp = () => {
  return (
    <>
      <CarouselComp carouselList={carouselData} />
      <ProductInfo />
    </>
  );
};

const HomePage = PageContainer(HomeComp);

const Home = () => {
  return <HomePage />;
};

export default Home;
