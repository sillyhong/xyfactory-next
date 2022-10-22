import React, { useMemo } from 'react';
import type { NextPage } from 'next'
import PageContainer from '@components/PageContainer';
import Contactus from '@pagerenders/Contactus';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';


const ContactUs: NextPage = () => {

  const ContactUsPage = useMemo(() => {
    return PageContainer(Contactus);
  }, [])
  return (
      <ContactUsPage/>
  )
}

export const getStaticProps = async ({ locale }: any) => {
  return ({
    props: {
      ...await serverSideTranslations(locale, ['common']),
    },
  })
}

export default ContactUs





