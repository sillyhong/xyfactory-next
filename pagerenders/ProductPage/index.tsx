import React, { useEffect, useState } from 'react';
import { useRouter } from "next/router";
import ProductList from "./ProductList";
import ProductDetail from "./ProductDetail";


const Product = () => {
  const router = useRouter();
  const { asPath = '' } = router || {}
  const [hasHash, setHasHash] = useState(false)
  useEffect(()=>{
    const hasHash = asPath?.includes('#')
    if(hasHash) {
      setHasHash(true)
    } else {
      setHasHash(false)
    }
  },[asPath, router])

  // product#doorhandle?id=D033H1
  if(hasHash){
    const productPath = asPath.substring(9)
    const [productCateGory = '', idParams = ''] = productPath.split('?')
    let id = ''
    if(idParams) {
     id = idParams.split('=')?.[1]
    }
    console.log('====================================');
    console.log('id', id);
    console.log('====================================');

    return <ProductDetail productCateGory={productCateGory} id={id}/>
  } else {
    return <ProductList/>;
  }
};

export default Product;
