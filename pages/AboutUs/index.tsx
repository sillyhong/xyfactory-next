import React from 'react';
import PageContainer from 'pages/components/PageContainer';
import 'bootstrap/dist/css/bootstrap.min.css';

const AboutUsComp = () => {
  return <div>about us </div>;
};

const HomePage = PageContainer(AboutUsComp);

const AboutUs = () => {
  return <HomePage />;
};

export default AboutUs;
