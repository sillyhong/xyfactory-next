import React from 'react';
import PageContainer from 'pages/components/PageContainer';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductComp = () => {
  return <div>about us </div>;
};

const HomePage = PageContainer(ProductComp);

const Product = () => {
  return <HomePage />;
};

export default Product;
