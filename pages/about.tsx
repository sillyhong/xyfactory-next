import React, { useMemo } from 'react';
import type { NextPage } from 'next'
import PageContainer from '@components/PageContainer';
import AboutUsPage from '@pagerenders/AboutUs';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useChangeLanguage } from '@/utils/languge';

const AboutUs: NextPage = () => {
  const router = useRouter()
  useChangeLanguage(router)

  const AboutUsPageComponent = useMemo(() => {
    return PageContainer(AboutUsPage);
  }, [])

  return (
      <AboutUsPageComponent />
  )
}

export const getStaticProps = async ({ locale }: any) => {
  return ({
    props: {
      ...await serverSideTranslations(locale, ['common']),
    },
  })
}

export default AboutUs





