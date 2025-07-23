import React from 'react';
import { useTranslation } from 'next-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ModernImage from '@components/ModernImage';
import { advantages } from '@constants/aboutus';
import aboutusEn from '@assets/images/aboutus/aboutus-en.jpg';
import factory from '@assets/images/aboutus/factory.jpg';
import SectionHeader from '@/components/SectionHeader';
import styles from './index.module.css';

const AboutUs = () => {
  const { t } = useTranslation('common');
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const renderDesc = () => {
    return (
      <div 
        className={styles.companyDescription}
        dangerouslySetInnerHTML={{ __html: t('about_us.text_homepage_about_us') }}
      />
    );
  };

  return (
    <div className={styles.aboutUsContainer}>
      {/* 头部横幅图片 */}
      <motion.div 
        className={styles.heroBanner}
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <ModernImage
          src={aboutusEn}
          alt={t('about_us.hero_banner_alt', '公司介绍横幅')}
          fill={false}
          width={1200}
          height={400}
          objectFit="cover"
          priority
          className={styles.heroImage}
          containerClassName={styles.heroImageContainer}
          sizes="100vw"
        />
        <div className={styles.heroOverlay}>
          <motion.h1 
            className={styles.heroTitle}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            {t('about_us.hero_title', '关于祥盈五金')}
          </motion.h1>
          <motion.p 
            className={styles.heroSubtitle}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            {t('about_us.hero_subtitle', '专业五金制造商，品质与创新的完美结合')}
          </motion.p>
        </div>
      </motion.div>

      <section className={styles.contentSection} ref={ref}>
        <div className="container-modern">
          {/* 公司优势 */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
            className={styles.sectionHeaderWrapper}
          >
            <SectionHeader 
              title={t('about_us.advantages_title', '我们的优势')} 
              showDesc={false}
              titleClass="text-center"
            />
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className={styles.advantagesGrid}
          >
            {advantages(t).map((item: any, index: number) => {
              const { title, desc, IconComp } = item;
              return (
                <motion.div
                  key={title}
                  variants={itemVariants}
                  className={styles.advantageCard}
                >
                  <div className={styles.iconWrapper}>
                    <motion.div
                      className={styles.iconContainer}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <IconComp size={42} className={styles.advantageIcon} />
                    </motion.div>
                  </div>
                  <h4 className={styles.advantageTitle}>{title}</h4>
                  <p className={styles.advantageDesc}>{desc}</p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* 公司简介 */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className={styles.companyProfile}
          >
            <div className={styles.profileContent}>
              <div className={styles.profileText}>
                <SectionHeader 
                  title={t('about_us.text_company_profile')} 
                  showDesc={false} 
                  showSperator={false} 
                  titleClass="justify-content-start"
                />
                {renderDesc()}
                
                <motion.div
                  className={styles.profileFeatures}
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: 1, duration: 0.8 }}
                >
                  <div className={styles.featureItem}>
                    <div className={styles.featureIcon}>✓</div>
                    <span>{t('about_us.feature_1', '20年专业经验')}</span>
                  </div>
                  <div className={styles.featureItem}>
                    <div className={styles.featureIcon}>✓</div>
                    <span>{t('about_us.feature_2', 'ISO质量认证')}</span>
                  </div>
                  <div className={styles.featureItem}>
                    <div className={styles.featureIcon}>✓</div>
                    <span>{t('about_us.feature_3', '全球销售网络')}</span>
                  </div>
                </motion.div>
              </div>

              <motion.div 
                className={styles.profileImage}
                initial={{ opacity: 0, x: 50 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                transition={{ delay: 0.7, duration: 0.8 }}
              >
                <ModernImage
                  src={factory}
                  alt={t('about_us.factory_image_alt', '祥盈五金工厂图片')}
                  fill={false}
                  width={600}
                  height={450}
                  objectFit="cover"
                  rounded
                  shadow
                  hoverEffect
                  zoomOnHover
                  className={styles.factoryImage}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                />
                
                {/* 悬浮信息卡片 */}
                <motion.div
                  className={styles.infoCard}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                >
                  <div className={styles.infoCardContent}>
                    <h5 className={styles.infoCardTitle}>
                      {t('about_us.factory_info_title', '现代化生产基地')}
                    </h5>
                    <p className={styles.infoCardText}>
                      {t('about_us.factory_info_text', '配备先进生产设备，确保产品品质')}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
