import React, { useMemo, useEffect, useState } from 'react';
import Head from 'next/head';
import { ThemeProvider } from 'react-bootstrap';
import { motion, useScroll, useSpring } from 'framer-motion';
import Navigator from '../Navigator';
import { useTranslation } from 'next-i18next'
import Footer from '../Footer';
import { UrlPrefix } from '@/constants';
import { useRouter } from 'next/router';
import { TitleMap } from '@/constants/language';
import styles from './index.module.css';

function PageContainer(Component: any) {
  return class Hoc extends React.Component {
    render() {
      const Header = () => {
        const { t } = useTranslation('common')
        const { pathname } = useRouter()

        const getTitle = useMemo(() => {
          return TitleMap(t)[pathname.replace('/', "")] || 'Home'
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
            <title id="main-title">{`${getTitle} | ${t('factory_name')}`}</title>
            <script
              key="structured-1"
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(structData) }}
            />
          </Head>
        )
      }

      const PageContent = () => {
        const [scrollY, setScrollY] = useState(0);
        const { scrollYProgress } = useScroll();
        const scaleX = useSpring(scrollYProgress, {
          stiffness: 100,
          damping: 30,
          restDelta: 0.001
        });

        useEffect(() => {
          const handleScroll = () => setScrollY(window.scrollY);
          window.addEventListener('scroll', handleScroll);
          return () => window.removeEventListener('scroll', handleScroll);
        }, []);

        return (
          <div className={styles.pageWrapper}>
            {/* 滚动进度条 */}
            <motion.div 
              className={styles.progressBar} 
              style={{ scaleX }}
            />

            {/* 背景装饰元素 */}
            <div className={styles.backgroundDecorations}>
              <motion.div 
                className={styles.floatingOrb1}
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div 
                className={styles.floatingOrb2}
                animate={{
                  y: [0, 30, 0],
                  x: [0, 15, 0],
                  rotate: [0, -180, -360],
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div 
                className={styles.floatingOrb3}
                animate={{
                  y: [0, -15, 0],
                  x: [0, -10, 0],
                  rotate: [0, 90, 180],
                }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>

            {/* 导航栏 */}
            <Navigator />

            {/* 主内容区域 */}
            <motion.main 
              className={styles.mainContent}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.div
                className={styles.contentWrapper}
                style={{
                  transform: `translateY(${scrollY * 0.05}px)`,
                }}
              >
                <Component {...this.props} />
              </motion.div>

              {/* 内容到联系我们的过渡区域 */}
              <motion.div 
                className={styles.transitionSection1}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
                viewport={{ once: true, margin: "-10%" }}
              >
                <svg
                  className={styles.transitionWave1}
                  viewBox="0 0 1440 200"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0,96L30,112C60,128,120,160,180,165.3C240,171,300,149,360,122.7C420,96,480,64,540,69.3C600,75,660,117,720,133.3C780,149,840,139,900,122.7C960,107,1020,85,1080,90.7C1140,96,1200,128,1260,138.7C1320,149,1380,139,1410,133.3L1440,128V200H1410C1380,200,1320,200,1260,200C1200,200,1140,200,1080,200C1020,200,960,200,900,200C840,200,780,200,720,200C660,200,600,200,540,200C480,200,420,200,360,200C300,200,240,200,180,200C120,200,60,200,30,200H0V96Z"
                    fill="url(#transitionGradient1)"
                  />
                  <defs>
                    <linearGradient id="transitionGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" style={{ stopColor: 'var(--neutral-50)', stopOpacity: 0.3 }} />
                      <stop offset="50%" style={{ stopColor: 'var(--primary-100)', stopOpacity: 0.5 }} />
                      <stop offset="100%" style={{ stopColor: 'var(--neutral-50)', stopOpacity: 0.3 }} />
                    </linearGradient>
                  </defs>
                </svg>
                
                <div className={styles.transitionContent1}>
                  <motion.div 
                    className={styles.connectingDots}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <div className={styles.dot}></div>
                    <div className={styles.dot}></div>
                    <div className={styles.dot}></div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.main>

            {/* 联系我们模块已移至专门的contact页面 */}

            {/* 联系我们到Footer的过渡区域 */}
            <motion.div 
              className={styles.transitionSection2}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true, margin: "-10%" }}
            >
              <div className={styles.transitionGradientOverlay}>
                <svg
                  className={styles.transitionWave2}
                  viewBox="0 0 1440 150"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0,75L34.3,85.3C68.6,96,137,117,206,112C274.3,107,343,75,411,74.7C480,75,549,107,617,112C685.7,117,754,96,823,85.3C891.4,75,960,75,1029,85.3C1097.1,96,1166,117,1234,117.3C1302.9,117,1371,96,1406,85.3L1440,75V150H1405.7C1371.4,150,1303,150,1234,150C1165.7,150,1097,150,1029,150C960,150,891,150,823,150C754.3,150,686,150,617,150C548.6,150,480,150,411,150C342.9,150,274,150,206,150C137.1,150,69,150,34,150H0V75Z"
                    fill="url(#transitionGradient2)"
                  />
                  <defs>
                    <linearGradient id="transitionGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" style={{ stopColor: 'var(--primary-200)', stopOpacity: 0.4 }} />
                      <stop offset="50%" style={{ stopColor: 'var(--primary-300)', stopOpacity: 0.6 }} />
                      <stop offset="100%" style={{ stopColor: 'var(--primary-200)', stopOpacity: 0.4 }} />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              <motion.div 
                className={styles.transitionParticles}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.2 }}
              >
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    className={styles.particle}
                    animate={{
                      y: [0, -30, 0],
                      opacity: [0.3, 1, 0.3],
                      scale: [0.8, 1.2, 0.8],
                    }}
                    transition={{
                      duration: 3 + i * 0.2,
                      repeat: Infinity,
                      delay: i * 0.3,
                      ease: "easeInOut"
                    }}
                    style={{
                      left: `${8 + i * 7}%`,
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>

            {/* Footer模块 */}
            <motion.section 
              className={styles.footerSection}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Footer />
            </motion.section>

            {/* 返回顶部按钮 */}
            <motion.button
              className={styles.backToTop}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: scrollY > 300 ? 1 : 0,
                scale: scrollY > 300 ? 1 : 0
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 19V5M5 12L12 5L19 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.button>
          </div>
        )
      }

      return (
        <>
          <Header />
          <ThemeProvider
            breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
            minBreakpoint="xxs"
          >
            <PageContent />
          </ThemeProvider>
        </>
      );
    }
  };
}

export default PageContainer;
