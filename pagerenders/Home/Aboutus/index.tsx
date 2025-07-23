import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ModernImage from '@components/ModernImage';
import SectionHeader from '@components/SectionHeader';
import factory from '@assets/images/aboutus/factory.jpg';
import styles from './index.module.css';

function Aboutus() {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const handleViewMoreClick = () => {
    router.push('/about');
  };

  const renderDesc = () => {
    return (
      <div 
        className={styles.description}
        dangerouslySetInnerHTML={{ __html: t('home_about_us.text_homepage_about_us') }}
      />
    );
  };

  return (
    <section className={`${styles.aboutusSection} section-padding`} ref={ref}>
      <div className="container-modern">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className={styles.sectionHeaderWrapper}
        >
          <SectionHeader 
            title={t('home_sub_header.about_us')} 
            showDesc={false}
            titleClass="text-center"
          />
        </motion.div>

        <div className={styles.contentWrapper}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={styles.imageSection}
          >
            <div className={styles.imageContainer}>
              <ModernImage
                src={factory}
                alt="工厂生产场景"
                fill
                aspectRatio="4/3"
                objectFit="cover"
                rounded
                shadow
                hoverEffect
                zoomOnHover
                priority
                overlay
                overlayContent={
                  <div className={styles.imageOverlayContent}>
                    <motion.div
                      className={styles.overlayText}
                      initial={{ opacity: 0, y: 20 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h4>专业制造</h4>
                      <p>20年经验 · 品质保证</p>
                    </motion.div>
                  </div>
                }
              />
              
              {/* 装饰元素 */}
              <div className={styles.imageDecorations}>
                <div className={styles.decorationCircle}></div>
                <div className={styles.decorationSquare}></div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className={styles.textSection}
          >
            <div className={styles.textContent}>
              {renderDesc()}
              
              <div className={styles.statsSection}>
                <motion.div
                  className={styles.statItem}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <div className={styles.statNumber}>20+</div>
                  <div className={styles.statLabel}>年行业经验</div>
                </motion.div>
                
                <motion.div
                  className={styles.statItem}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                >
                  <div className={styles.statNumber}>1000+</div>
                  <div className={styles.statLabel}>客户信赖</div>
                </motion.div>
                
                <motion.div
                  className={styles.statItem}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  <div className={styles.statNumber}>50+</div>
                  <div className={styles.statLabel}>国家出口</div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                className={styles.buttonWrapper}
              >
                <motion.button
                  className={`btn btn-primary ${styles.viewMoreButton}`}
                  onClick={handleViewMoreClick}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t('home_about_us.text_view_more')}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path 
                      d="M9 18L15 12L9 6" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* 特色亮点 */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          className={styles.featuresSection}
        >
          <div className={styles.featuresGrid}>
            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <h4>品质保证</h4>
              <p>严格的质量控制体系</p>
            </div>
            
            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h4>快速交付</h4>
              <p>高效的生产和物流</p>
            </div>
            
            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h4>专业服务</h4>
              <p>一对一客户服务支持</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Aboutus;
