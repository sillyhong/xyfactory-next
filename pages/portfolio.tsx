import React, { useMemo } from 'react';
import type { NextPage } from 'next'
import PageContainer from '@components/PageContainer';
import PortfolioComp from '@pagerenders/Portfolio';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';



const Portfolio: NextPage = () => {

  const PortfolioPage = useMemo(() => {
    return PageContainer(PortfolioComp);
  }, [])

  return (
      <PortfolioPage />
  )
}

export const getStaticProps = async ({ locale }: any) => {
  return ({
    props: {
      ...await serverSideTranslations(locale, ['common']),
    },
  })
}

export default Portfolio





