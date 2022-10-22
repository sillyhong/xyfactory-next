import React, { useMemo } from 'react';
import type { NextPage } from 'next'
import PageContainer from '@components/PageContainer';
import ProductComp from '@pagerenders/ProductPage/index';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';


const Product: NextPage = () => {
  const ProductPage = useMemo(() => {
    return PageContainer(ProductComp);
  }, [])

  return (
      <ProductPage/>
  )
}

export const getStaticProps = async ({ locale }: any) => {
  return ({
    props: {
      ...await serverSideTranslations(locale, ['common']),
    },
  })
}

export default Product





