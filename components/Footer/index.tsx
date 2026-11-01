import React, { useCallback, useRef, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { motion, useReducedMotion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ContactUs, ContacusEnum } from '@constants/contactus';
import { useRouter } from 'next/router';
import { ProductCategories } from '@constants/index';
import styles from './index.module.css';

type HeartParticle = {
  id: number;
  drift: number;
};

const CONTACT_LINKS: Record<string, string> = {
  [ContacusEnum.WHATSAPP]: 'https://wa.me/8613124932180',
  [ContacusEnum.FACEBOOK]: 'https://www.facebook.com/profile.php?id=100035082511602',
  [ContacusEnum.INSTAGRAM]: 'https://www.instagram.com/xyglass_accessory_factory',
  [ContacusEnum.TIKTOK]: 'https://www.tiktok.com/@xyglasshardwarefactory',
  [ContacusEnum.EMAIL]: 'mailto:xyglassaccessory@gmail.com',
};

function FooterComp() {
  const { t } = useTranslation('common');
  const router: any = useRouter();
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });
  const [heartParticles, setHeartParticles] = useState<HeartParticle[]>([]);
  const nextHeartId = useRef(0);
  const shouldReduceMotion = useReducedMotion();

  const getCurrentYear = new Date().getFullYear();

  const handleContactClick = useCallback((contactInfo: any, e: any) => {
    e.stopPropagation();
    const { label } = contactInfo;

    if (CONTACT_LINKS[label]) {
      window.open(CONTACT_LINKS[label], '_blank', 'noopener,noreferrer');
      return;
    }

    router.push('/contact');
  }, [router]);

  const handleProductClick = useCallback((path: string) => {
    router.push(path);
  }, [router]);

  const handleMadeWithLoveClick = useCallback(() => {
    const id = nextHeartId.current++;
    const drift = Math.round((Math.random() - 0.5) * 40);
    setHeartParticles((particles) => [...particles, { id, drift }]);
  }, []);

  const handleHeartAnimationComplete = useCallback((id: number) => {
    setHeartParticles((particles) => particles.filter((particle) => particle.id !== id));
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <>
      {/* 现代化波浪分隔线 */}
      {/* <div className={styles.waveContainer}>
        <svg
          className={styles.waveTop}
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,32L48,37.3C96,43,192,53,288,58.7C384,64,480,64,576,69.3C672,75,768,85,864,80C960,75,1056,53,1152,48C1248,43,1344,53,1392,58.7L1440,64V120H1392C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120H0V32Z"
            fill="url(#gradient1)"
          />
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: 'var(--primary-600)', stopOpacity: 0.8 }} />
              <stop offset="50%" style={{ stopColor: 'var(--primary-400)', stopOpacity: 0.9 }} />
              <stop offset="100%" style={{ stopColor: 'var(--primary-600)', stopOpacity: 0.8 }} />
            </linearGradient>
          </defs>
        </svg>
      </div> */}

      {/* 主要Footer内容 */}
      <motion.footer
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
        className={styles.footerSection}
      >
        <div className={styles.footerContainer}>
          {/* 公司信息区域 */}
          <motion.div className={styles.companySection} variants={itemVariants}>
            <div className={styles.logoArea}>
              <motion.h2 
                className={styles.companyName}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                {t('factory_name')}
              </motion.h2>
              <p className={styles.companyTagline}>
                {t('footer.company_tagline')}
              </p>
            </div>
            
            <div className={styles.companyDescription}>
              <p>{t('footer.company_description')}</p>
            </div>

            <div className={styles.certifications}>
              <motion.div className={styles.certBadge} whileHover={{ y: -2 }}>
                <span className={styles.certIcon}>🏆</span>
                <span className={styles.certText}>{t('footer.quality_certified')}</span>
              </motion.div>
              <motion.div className={styles.certBadge} whileHover={{ y: -2 }}>
                <span className={styles.certIcon}>🌍</span>
                <span className={styles.certText}>{t('footer.global_service')}</span>
              </motion.div>
            </div>
          </motion.div>

          {/* 产品分类区域 */}
          <motion.div className={styles.productsSection} variants={itemVariants}>
            <h3 className={styles.sectionTitle}>
              <span className={styles.titleIcon}>📦</span>
              {t('home_footer.product_categories')}
            </h3>
            
            <div className={styles.productGrid}>
              {ProductCategories(t).map((item, index) => (
                <motion.button
                  key={item.label + index}
                  type="button"
                  className={styles.productItem}
                  variants={iconVariants}
                  onClick={() => handleProductClick(item.path)}
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: 'rgba(103, 125, 214, 0.1)'
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className={styles.productLabel}>{item.label}</span>
                  <span className={styles.productArrow}>→</span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* 联系方式区域 */}
          <motion.div className={styles.contactSection} variants={itemVariants}>
            <h3 className={styles.sectionTitle}>
              <span className={styles.titleIcon}>📞</span>
              {t('nav.nav_contact_us')}
            </h3>
            
            <div className={styles.contactGrid}>
              {ContactUs.map((item, index) => (
                <motion.button
                  key={item.label + index}
                  type="button"
                  className={styles.contactItem}
                  variants={iconVariants}
                  onClick={(e) => handleContactClick(item, e)}
                  whileHover={{ 
                    scale: 1.1,
                    rotateY: 10
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  <div className={styles.contactIcon}>
                    {item.icon()}
                  </div>
                  <span className={styles.contactLabel}>{item.label}</span>
                  <div className={styles.contactGlow}></div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* 快速链接区域 */}
          <motion.div className={styles.linksSection} variants={itemVariants}>
            <h3 className={styles.sectionTitle}>
              <span className={styles.titleIcon}>🔗</span>
              {t('footer.quick_links')}
            </h3>
            
            <div className={styles.linksList}>
              {[
                { label: t('nav.nav_home'), path: '/home' },
                { label: t('nav.nav_about_us'), path: '/about' },
                { label: t('nav.nav_portfolio'), path: '/portfolio' },
                { label: t('nav.nav_contact_us'), path: '/contact' }
              ].map((link, index) => (
                <motion.button
                  key={link.label + index}
                  type="button"
                  className={styles.linkItem}
                  onClick={() => router.push(link.path)}
                  whileHover={{ x: 10 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className={styles.linkBullet}>•</span>
                  <span className={styles.linkText}>{link.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* 底部版权信息 */}
        <motion.div 
          className={styles.copyrightSection}
          variants={itemVariants}
        >
          <div className={styles.copyrightContainer}>
            <div className={styles.copyrightLeft}>
              <motion.div 
                className={styles.copyrightBadge}
                whileHover={{ scale: 1.05 }}
              >
                <span className={styles.copyrightIcon}>©</span>
                <span className={styles.copyrightText}>
                  {getCurrentYear} {t('factory_name')} - {t('footer.all_rights_reserved')}
                </span>
              </motion.div>
            </div>
            
            <div className={styles.copyrightRight}>
              <motion.button
                type="button"
                className={styles.madeBadge}
                onClick={handleMadeWithLoveClick}
                aria-label={t('footer.made_with_love')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
              >
                <span className={styles.madeText}>{t('footer.made_with_love')}</span>
                <span className={styles.heartIcon} aria-hidden="true">❤️</span>
                {heartParticles.map(({ id, drift }) => (
                  <motion.span
                    key={id}
                    className={styles.floatingHeart}
                    aria-hidden="true"
                    initial={shouldReduceMotion ? { opacity: 0, scale: 0.8 } : { opacity: 0, y: 4, scale: 0.7 }}
                    animate={shouldReduceMotion
                      ? { opacity: [0, 1, 0], scale: [0.8, 1.15, 1] }
                      : { opacity: [0, 1, 0], y: [4, -42, -104], x: [0, drift, drift * 0.55], scale: [0.7, 1.1, 0.9] }}
                    transition={{ duration: shouldReduceMotion ? 0.25 : 1.15, ease: 'easeOut' }}
                    onAnimationComplete={() => handleHeartAnimationComplete(id)}
                  >
                    ❤️
                  </motion.span>
                ))}
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* 装饰性背景元素 */}
        <div className={styles.decorativeElements}>
          <div className={styles.floatingElement1}></div>
          <div className={styles.floatingElement2}></div>
          <div className={styles.floatingElement3}></div>
        </div>
      </motion.footer>
    </>
  );
}

export default FooterComp;
