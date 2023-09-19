import React, { useMemo } from 'react';
import Head from 'next/head';
import { ThemeProvider } from 'react-bootstrap';
import Navigator from '../Navigator';
import { useTranslation } from 'next-i18next'
import Contactus from '../Contactus';
import Footer from '../Footer';
import { UrlPrefix } from '@/constants';
import { useRouter } from 'next/router';
import { TitleMap } from '@/constants/language';


function PageContainer(Component: any) {
  return class Hoc extends React.Component {
    render() {

      const Header = () => {
        const { t } = useTranslation('common')
        const { pathname } = useRouter()

        const getTitle = useMemo(() => {
          return TitleMap(t)[pathname.replace('/', "")]
        }, [pathname, t])

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
            {/* google 爬虫 */}
            <meta name="google-site-verification" content="3uEVtewNqo-I_YE7y_y3r-3ZmqIITWAIBo8W2Qe8KYw" />
            {/* baidu 爬虫 */}
            <meta name="baidu-site-verification" content="codeva-9kwOLGocee" />
            <link rel="icon" href={`${UrlPrefix ? UrlPrefix : "/"}favicon.ico`} />
            <title id="main-title">{getTitle} | {t('factory_name')}</title>
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
