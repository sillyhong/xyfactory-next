import React, { useMemo } from 'react';
import type { NextPage } from 'next'
import PageContainer from '@components/PageContainer';


const ContactUsComp = () => {
  return <div>about us </div>;
};


const ContactUs: NextPage = () => {

  const ContactUsPage = useMemo(() => {
    return PageContainer(ContactUsComp);
  }, [])

  return (
      <ContactUsPage />
  )
}


export default ContactUs





