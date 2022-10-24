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

  
  // product?page=2
  // product?id=xxx
  if(hasHash){
    const id = asPath.substring(9)
    return <ProductDetail id={id}/>
  } else {
    return <ProductList/>;
  }
};

export default Product;
