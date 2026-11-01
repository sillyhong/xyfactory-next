import { ComponentType, PropsWithChildren, useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ThemeProvider } from 'react-bootstrap';
import { MotionConfig, motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import Navigator from '../Navigator';
import Footer from '../Footer';
import SectionTransition from '../SectionTransition';
import { TitleMap } from '@/constants/language';
import { getLocaleAttributes } from '@/constants/locales';
import styles from './index.module.css';

function PageHeader() {
  const { t } = useTranslation('common');
  const { pathname } = useRouter();
  const title = TitleMap(t)[pathname.replace('/', '')] || t('nav.nav_home');
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: 'https://www.xyglassaccessories.com',
    name: t('factory_name'),
    description: t('header.description'),
  };

  return (
    <Head>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="description" content={t('header.description')} />
      <meta name="google-site-verification" content="3uEVtewNqo-I_YE7y_y3r-3ZmqIITWAIBo8W2Qe8KYw" />
      <meta name="baidu-site-verification" content="codeva-9kwOLGocee" />
      <link rel="icon" href="/favicon.ico" />
      <title id="main-title">{`${title} | ${t('factory_name')}`}</title>
      <script key="structured-1" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
    </Head>
  );
}

function PageShell({ children }: PropsWithChildren) {
  const { t } = useTranslation('common');
  const { locale, events } = useRouter();
  const { lang, dir } = getLocaleAttributes(locale);
  const shouldReduceMotion = useReducedMotion();
  const [showBackToTop, setShowBackToTop] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useMotionValueEvent(scrollY, 'change', (latest) => setShowBackToTop(latest > 320));

  useEffect(() => {
    const syncDocumentLanguage = () => {
      document.documentElement.lang = lang;
      document.documentElement.dir = dir;
    };
    syncDocumentLanguage();
    // Next writes the internal locale name after committing a navigation.
    events.on('routeChangeComplete', syncDocumentLanguage);
    events.on('hashChangeComplete', syncDocumentLanguage);
    return () => {
      events.off('routeChangeComplete', syncDocumentLanguage);
      events.off('hashChangeComplete', syncDocumentLanguage);
    };
  }, [lang, dir, events]);

  return (
    <MotionConfig reducedMotion="user">
      <PageHeader />
      <ThemeProvider breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']} minBreakpoint="xxs">
        <div className={styles.pageWrapper} lang={lang} dir={dir}>
          <button
            type="button"
            className={styles.skipLink}
            onClick={() => {
              const main = document.getElementById('site-main');
              main?.focus({ preventScroll: true });
              main?.scrollIntoView({ block: 'start', behavior: shouldReduceMotion ? 'auto' : 'smooth' });
            }}
          >{t('common.skip_to_content')}</button>
          <motion.div className={styles.progressBar} style={{ scaleX }} aria-hidden="true" />
          <div className={styles.backgroundDecorations} aria-hidden="true">
            <div className={styles.floatingOrb1} />
            <div className={styles.floatingOrb2} />
            <div className={styles.floatingOrb3} />
          </div>
          <Navigator />
          <main id="site-main" tabIndex={-1} className={styles.mainContent}>
            <div className={styles.contentWrapper}>{children}</div>
          </main>
          <SectionTransition />
          <section className={styles.footerSection}><Footer /></section>
          {showBackToTop && (
            <motion.button
              type="button"
              className={styles.backToTop}
              aria-label={t('common.back_to_top')}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.scrollTo({ top: 0, behavior: shouldReduceMotion ? 'auto' : 'smooth' })}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 19V5M5 12L12 5L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.button>
          )}
        </div>
      </ThemeProvider>
    </MotionConfig>
  );
}

function PageContainer<P extends object>(Component: ComponentType<P>) {
  return function Page(props: P) {
    return <PageShell><Component {...props} /></PageShell>;
  };
}

export default PageContainer;
