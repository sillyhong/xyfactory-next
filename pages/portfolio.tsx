import React, { useMemo } from 'react';
import type { NextPage } from 'next'
import PageContainer from '@components/PageContainer';
import PortfolioComp from '@pagerenders/Portfolio';



const Portfolio: NextPage = () => {

  const PortfolioPage = useMemo(() => {
    return PageContainer(PortfolioComp);
  }, [])

  return (
      <PortfolioPage />
  )
}

export default Portfolio





