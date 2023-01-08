import React, { useMemo } from 'react';
import type { NextPage } from 'next'
import PageContainer from '@components/PageContainer';
import ProductComp from '@pagerenders/ProductPage/index';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useChangeLanguage } from '@/utils/languge';


const Product: NextPage = () => {
  const router = useRouter()
  useChangeLanguage(router)
  
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





