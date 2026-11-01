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

  // 多个视图检测点，提供更精准的动画控制
  const { ref: heroRef, inView: heroInView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const { ref: advantagesRef, inView: advantagesInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const { ref: profileRef, inView: profileInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // 优化的动画变体
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  // 浮动动画变体
  const floatVariants = {
    hidden: { y: 0 },
    visible: {
      y: [-5, 5, -5],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
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
      {/* 优化的头部横幅 */}
      <motion.div
        ref={heroRef}
        className={styles.heroBanner}
        initial={{ opacity: 0 }}
        animate={heroInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <div className={styles.heroImageContainer}>
          <ModernImage
            src={aboutusEn}
            alt={t('about_us.hero_banner_alt')}
            fill={false}
            width={1920}
            height={600}
            objectFit="cover"
            priority
            className={styles.heroImage}
            sizes="100vw"
          />
          <div className={styles.heroOverlay}>
            <motion.div
              className={styles.heroContent}
              initial={{ opacity: 0, y: 50 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <h1 className={styles.heroTitle}>
                {t('about_us.hero_title')}
              </h1>
              <p className={styles.heroSubtitle}>
                {t('about_us.hero_subtitle')}
              </p>
              <motion.div
                className={styles.heroStats}
                initial={{ opacity: 0, y: 30 }}
                animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ delay: 1, duration: 0.6 }}
              >
                <div className={styles.statItem}>
                  <span className={styles.statNumber}>15+</span>
                  <span className={styles.statLabel}>{t('about_us.years_experience')}</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statNumber}>50+</span>
                  <span className={styles.statLabel}>{t('about_us.countries_served')}</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statNumber}>1000+</span>
                  <span className={styles.statLabel}>{t('about_us.happy_clients')}</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* 内容区域 */}
      <section className={styles.contentSection}>
        <div className="container-modern">
          {/* 公司优势 - 优化的动画 */}
          <motion.div
            ref={advantagesRef}
            initial={{ opacity: 0, y: 50 }}
            animate={advantagesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6 }}
            className={styles.sectionHeaderWrapper}
          >
            <SectionHeader
              title={t('about_us.advantages_title')}
              showDesc={false}
              titleClass="text-center"
            />
            <motion.p
              className={styles.sectionSubtitle}
              initial={{ opacity: 0, y: 20 }}
              animate={advantagesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              {t('about_us.advantages_subtitle')}
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={advantagesInView ? "visible" : "hidden"}
            className={styles.advantagesGrid}
          >
            {advantages(t).map((item: any, index: number) => {
              const { title, desc, IconComp } = item;
              return (
                <motion.div
                  key={title}
                  variants={itemVariants}
                  className={styles.advantageCard}
                  whileHover={{
                    y: -8,
                    scale: 1.02,
                    transition: { duration: 0.3 }
                  }}
                >
                  <motion.div
                    className={styles.iconWrapper}
                    variants={floatVariants}
                    initial="hidden"
                    animate={advantagesInView ? "visible" : "hidden"}
                  >
                    <motion.div
                      className={styles.iconContainer}
                      whileHover={{
                        scale: 1.1,
                        rotate: [0, -5, 5, 0],
                        transition: { duration: 0.4 }
                      }}
                    >
                      <IconComp size={42} className={styles.advantageIcon} />
                    </motion.div>
                  </motion.div>

                  <motion.div
                    className={styles.cardContent}
                    initial={{ opacity: 0, y: 20 }}
                    animate={advantagesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                  >
                    <h4 className={styles.advantageTitle}>{title}</h4>
                    <p className={styles.advantageDesc}>{desc}</p>
                  </motion.div>

                  {/* 悬浮效果装饰 */}
                  <motion.div
                    className={styles.cardGlow}
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              );
            })}
          </motion.div>

          {/* 公司简介 - 改进的布局 */}
          <motion.div
            ref={profileRef}
            initial={{ opacity: 0, y: 50 }}
            animate={profileInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className={styles.companyProfile}
          >
            <div className={styles.profileContent}>
              <motion.div
                className={styles.profileText}
                initial={{ opacity: 0, x: -50 }}
                animate={profileInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
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
                  animate={profileInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: 1, duration: 0.8 }}
                >
                  {[
                    { key: 'feature_1', icon: '🏆' },
                    { key: 'feature_2', icon: '✓' },
                    { key: 'feature_3', icon: '🌍' }
                  ].map((feature, index) => (
                    <motion.div
                      key={feature.key}
                      className={styles.featureItem}
                      initial={{ opacity: 0, x: -20 }}
                      animate={profileInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
                    >
                      <div className={styles.featureIcon}>{feature.icon}</div>
                      <span>{t(`about_us.${feature.key}`)}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              <motion.div
                className={styles.profileImage}
                initial={{ opacity: 0, x: 50 }}
                animate={profileInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                transition={{ delay: 0.7, duration: 0.8 }}
              >
                <ModernImage
                  src={factory}
                  alt={t('about_us.factory_image_alt')}
                  fill
                  objectFit="cover"
                  containerClassName={styles.factoryImageFrame}
                  className={styles.factoryImage}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
