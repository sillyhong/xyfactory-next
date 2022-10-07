import React, { useMemo } from 'react';
import type { NextPage } from 'next'
import PageContainer from './components/PageContainer';
import ProductComp from './Product/index';


const Product: NextPage = () => {
  const ProductPage = useMemo(() => {
    return PageContainer(ProductComp);
  }, [])

  return (
      <ProductPage/>
  )
}


export default Product





