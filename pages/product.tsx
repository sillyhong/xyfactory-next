import React, { useMemo } from 'react';
import type { NextPage } from 'next'
import PageContainer from './components/PageContainer';


const ProductComp = () => {
  return <div>product  </div>;
};


const Product: NextPage = () => {

  const ProductPage = useMemo(() => {
    return PageContainer(ProductComp);
  }, [])

  return (
    <ProductPage />
  )
}


export default Product





