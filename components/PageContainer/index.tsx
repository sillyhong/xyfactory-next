import React from 'react';
import Head from 'next/head';
import { ThemeProvider } from 'react-bootstrap';
import Navigator from '../Navigator';
import { useTranslation } from 'next-i18next'
import Contactus from '../Contactus';
import Footer from '../Footer';

function PageContainer(Component: any) {
  return class Hoc extends React.Component {
    render() {
      const Header = () => {
      const { t } = useTranslation('common')

        const structData = {
          "@context": "http://schema.org",
          "@type": "WebSite",
          "url": "http://xyglassaccessories.com",
          "name": "xyglassaccessories",
          "description": t('header.description')
        };
        return (
          <Head>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <meta name="description" content={t('header.description')} />
            <meta name="google-site-verification" content="3uEVtewNqo-I_YE7y_y3r-3ZmqIITWAIBo8W2Qe8KYw" />
            <meta name="baidu-site-verification" content="codeva-9kwOLGocee" />
            <link rel="icon" href="/favicon.ico" />
            <script
              key="structured-1"
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(structData) }}
            />
          </Head>
        )
      }
      return (
        <>
          <Header />
          <ThemeProvider
            breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
            minBreakpoint="xxs"
          >
            <Navigator />
            <Component {...this.props} />
            <Contactus />
            <Footer />
          </ThemeProvider>
        </>

      );
    }
  };
}
export default PageContainer;
