import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import SectionHeader from '@components/SectionHeader';
import styles from './index.module.css';

import portfolio1 from '@assets/images/portfolio/portfolio-1.jpg';
import portfolio2 from '@assets/images/portfolio/portfolio-2.jpg';
import portfolio3 from '@assets/images/portfolio/portfolio-3.jpg';
import portfolio4 from '@assets/images/portfolio/portfolio-4.jpg';
import portfolio5 from '@assets/images/portfolio/portfolio-5.jpg';
import portfolio6 from '@assets/images/portfolio/portfolio-6.jpg';
import portfolio7 from '@assets/images/portfolio/portfolio-7.jpg';
import portfolio8 from '@assets/images/portfolio/portfolio-8.jpg';
import portfolio9 from '@assets/images/portfolio/portfolio-9.jpg';
import portfolio10 from '@assets/images/portfolio/portfolio-10.jpg';
import portfolio11 from '@assets/images/portfolio/portfolio-11.jpg';
import portfolio12 from '@assets/images/portfolio/portfolio-12.jpg';

const Portfolio = () => {
  const { t } = useTranslation('common');
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const Portfolios = useMemo(() => {
    return [
      {
        src: portfolio1,
        title: t('portfolio.items.item_1.title', "高端门把手系列"),
        desc: t('portfolio.items.item_1.desc', "优质不锈钢材质，精工细作"),
        category: t('portfolio.categories.door_hardware', "门具五金")
      },
      {
        src: portfolio2,
        title: t('portfolio.items.item_2.title', "现代淋浴铰链"),
        desc: t('portfolio.items.item_2.desc', "防水防锈，经久耐用"),
        category: t('portfolio.categories.bathroom_accessories', "浴室配件")
      },
      {
        src: portfolio3,
        title: t('portfolio.items.item_3.title', "玻璃门配件"),
        desc: t('portfolio.items.item_3.desc', "透明美观，安装便捷"),
        category: t('portfolio.categories.glass_hardware', "玻璃五金")
      },
      {
        src: portfolio4,
        title: t('portfolio.items.item_4.title', "定制滑轮系统"),
        desc: t('portfolio.items.item_4.desc', "静音顺滑，承重力强"),
        category: t('portfolio.categories.sliding_accessories', "滑动配件")
      },
      {
        src: portfolio5,
        title: t('portfolio.items.item_5.title', "建筑装饰五金"),
        desc: t('portfolio.items.item_5.desc', "建筑级品质标准"),
        category: t('portfolio.categories.architectural_hardware', "建筑五金")
      },
      {
        src: portfolio6,
        title: t('portfolio.items.item_6.title', "家具连接件"),
        desc: t('portfolio.items.item_6.desc', "精密制造，稳固可靠"),
        category: t('portfolio.categories.furniture_hardware', "家具五金")
      },
      {
        src: portfolio7,
        title: t('portfolio.items.item_7.title', "管道连接器"),
        desc: t('portfolio.items.item_7.desc', "密封性好，安全可靠"),
        category: t('portfolio.categories.pipe_accessories', "管道配件")
      },
      {
        src: portfolio8,
        title: t('portfolio.items.item_8.title', "工业级铰链"),
        desc: t('portfolio.items.item_8.desc', "重型应用，持久耐用"),
        category: t('portfolio.categories.industrial_hardware', "工业五金")
      },
      {
        src: portfolio9,
        title: t('portfolio.items.item_9.title', "装饰性配件"),
        desc: t('portfolio.items.item_9.desc', "美观实用，品质优良"),
        category: t('portfolio.categories.decorative_hardware', "装饰五金")
      },
      {
        src: portfolio10,
        title: t('portfolio.items.item_10.title', "安全锁具系列"),
        desc: t('portfolio.items.item_10.desc', "安全防护，质量保证"),
        category: t('portfolio.categories.security_hardware', "安全五金")
      },
      {
        src: portfolio11,
        title: t('portfolio.items.item_11.title', "精密小件"),
        desc: t('portfolio.items.item_11.desc', "工艺精细，尺寸精准"),
        category: t('portfolio.categories.precision_parts', "精密配件")
      },
      {
        src: portfolio12,
        title: t('portfolio.items.item_12.title', "定制解决方案"),
        desc: t('portfolio.items.item_12.desc', "按需定制，专业服务"),
        category: t('portfolio.categories.custom_products', "定制产品")
      }
    ];
  }, [t]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 80,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className={styles.portfolioPageContainer}>
      {/* 英雄横幅区域 */}
      <motion.section 
        className={styles.heroBanner}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className={styles.heroContent}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className={styles.heroTitleContainer}
          >
            <h1 className={styles.heroTitle}>
              {t('portfolio.title', '产品作品集')}
            </h1>
            <div className={styles.heroTitleDecoration}></div>
          </motion.div>
          
          <motion.p 
            className={styles.heroDescription}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {t('portfolio.description', '探索我们完整的优质五金产品系列，精工制作，经久耐用')}
          </motion.p>

          <motion.div
            className={styles.heroStats}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <div className={styles.statItem}>
              <span className={styles.statNumber}>12+</span>
              <span className={styles.statLabel}>{t('portfolio.stats.categories', '产品类别')}</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>500+</span>
              <span className={styles.statLabel}>{t('portfolio.stats.products', '产品种类')}</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>20+</span>
              <span className={styles.statLabel}>{t('portfolio.stats.years', '年经验')}</span>
            </div>
          </motion.div>
        </div>

        {/* 背景装饰 */}
        <div className={styles.heroBackground}>
          <div className={styles.heroPattern}></div>
          <div className={styles.heroGradient}></div>
        </div>
      </motion.section>

      {/* 主要内容区域 */}
      <section className={styles.portfolioMainContent} ref={ref}>
        <div className="container-modern">
          {/* 作品集网格 */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className={styles.portfolioGrid}
          >
            {Portfolios.map((item, index) => (
              <motion.div
                key={item.title + index}
                variants={itemVariants}
                className={styles.portfolioItem}
              >
                <div className={styles.portfolioCard}>
                  {/* 图片区域 */}
                  <div className={styles.imageSection}>
                    <div className={styles.imageWrapper}>
                      <Image
                        src={item.src}
                        alt={item.title}
                        width={400}
                        height={300}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                        priority={index < 4}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                        className={styles.portfolioImage}
                      />
                      
                      {/* 覆盖层 */}
                      <motion.div
                        className={styles.imageOverlay}
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className={styles.overlayContent}>
                          <div className={styles.categoryBadge}>
                            {item.category}
                          </div>
                          <motion.button
                            className={styles.viewButton}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                              <path d="M1 12S5 4 12 4S23 12 23 12S19 20 12 20S1 12 1 12Z" stroke="currentColor" strokeWidth="2"/>
                              <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                            </svg>
                            {t('portfolio.view_details', '查看详情')}
                          </motion.button>
                        </div>
                      </motion.div>
                    </div>

                    {/* 图片角标 */}
                    <div className={styles.imageCorner}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>

                  {/* 内容区域 */}
                  <div className={styles.cardContent}>
                    <div className={styles.cardHeader}>
                      <h3 className={styles.cardTitle}>{item.title}</h3>
                      <span className={styles.cardCategory}>{item.category}</span>
                    </div>
                    
                    <p className={styles.cardDescription}>
                      {item.desc}
                    </p>

                    <div className={styles.cardFooter}>
                      <div className={styles.cardTags}>
                        <span className={styles.tag}>{t('portfolio.tags.premium', '高品质')}</span>
                        <span className={styles.tag}>{t('portfolio.tags.durable', '耐用')}</span>
                      </div>
                      
                      <motion.button
                        className={styles.learnMoreButton}
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {t('portfolio.learn_more', '了解更多')}
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* 底部CTA区域 */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className={styles.ctaSection}
          >
            <div className={styles.ctaCard}>
              <div className={styles.ctaContent}>
                <h3 className={styles.ctaTitle}>
                  {t('portfolio.cta.title', '对我们的产品感兴趣？')}
                </h3>
                <p className={styles.ctaDescription}>
                  {t('portfolio.cta.description', '联系我们获取更多信息和定制解决方案，我们将为您提供专业的服务')}
                </p>
                
                <div className={styles.ctaButtons}>
                  <motion.button
                    className={`btn btn-primary ${styles.ctaPrimaryButton}`}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {t('portfolio.cta.contact', '立即联系')}
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </motion.button>
                  
                  <motion.button
                    className={`btn btn-outline ${styles.ctaSecondaryButton}`}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {t('portfolio.cta.catalog', '下载目录')}
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M21 15V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <line x1="12" y1="15" x2="12" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </motion.button>
                </div>
              </div>
              
              {/* CTA背景装饰 */}
              <div className={styles.ctaBackground}>
                <div className={styles.ctaPattern}></div>
                <div className={styles.ctaGlow}></div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
