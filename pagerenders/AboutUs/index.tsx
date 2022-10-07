import React from 'react';
import PageContainer from '@components/PageContainer';

const AboutUsComp = () => {
  return <div>about us </div>;
};

const HomePage = PageContainer(AboutUsComp);

const AboutUs = () => {
  return <HomePage />;
};

export default AboutUs;
