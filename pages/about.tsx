import React, { useMemo } from 'react';
import type { NextPage } from 'next'
import PageContainer from '@components/PageContainer';
import AboutUsPage from '@pagerenders/AboutUs';



const ContactUs: NextPage = () => {

  const ContactUsPage = useMemo(() => {
    return PageContainer(AboutUsPage);
  }, [])

  return (
      <ContactUsPage />
  )
}

export default ContactUs





