import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useMemo, useState } from 'react';
import SectionHeader from '@components/SectionHeader';
import { ProductInfos } from '../../../constants/productInfo';
import styles from './index.module.css';

function ProductInfo() {
  const { t } = useTranslation('common');
  const router = useRouter();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const hotProducts = useMemo(() => {
    const productInfos = ProductInfos(t);
    const homeHotProducts: any[] = [];
    Object.values(productInfos).forEach((item: any) => {
      return item.forEach((subItem: any) => {
        if (subItem?.homeHot === true && !homeHotProducts.includes(subItem)) {
          homeHotProducts.push(subItem);
        }
      });
    });
    return homeHotProducts;
  }, [t]);

  const handleItemClick = (item: any) => {
    router.push(item.path);
  };

  const handleItemHover = (itemId: string | null) => {
    setHoveredItem(itemId);
  };

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
      y: 60,
      scale: 0.9,
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

  return (
    <section className={`${styles.hotProductsSection} section-padding`} ref={ref}>
      <div className="container-modern">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className={styles.sectionHeaderWrapper}
        >
          <SectionHeader 
            title={t('home_hot_product.sub_title')} 
            showDesc={false}
            titleClass="text-center"
          />
          <p className={styles.sectionDescription}>
            精选优质五金产品，为您的项目提供可靠的解决方案
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className={styles.productsGrid}
        >
          {hotProducts.map((item, index) => (
            <motion.div
              key={item.desc || index}
              variants={itemVariants}
              className={styles.productCardWrapper}
              onHoverStart={() => handleItemHover(item.desc)}
              onHoverEnd={() => handleItemHover(null)}
              onClick={() => handleItemClick(item)}
            >
              <div className={`${styles.productCard} product-card`}>
                <div className={styles.imageContainer}>
                  <div className={styles.imageWrapper}>
                    <Image
                      className={styles.productImage}
                      src={item.src}
                      alt={item.title}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                    <div className={styles.imageOverlay}></div>
                  </div>
                  
                  {/* 悬浮效果 */}
                  <motion.div
                    className={styles.hoverOverlay}
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: hoveredItem === item.desc ? 1 : 0 
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className={styles.hoverContent}>
                      <motion.button
                        className={`btn btn-primary ${styles.viewButton}`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        查看详情
                      </motion.button>
                      <motion.button
                        className={`btn btn-outline ${styles.contactButton}`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        立即咨询
                      </motion.button>
                    </div>
                  </motion.div>

                  {/* 产品标签 */}
                  <div className={styles.productBadge}>
                    <span className={styles.hotBadge}>HOT</span>
                  </div>
                </div>

                <div className={styles.cardContent}>
                  <motion.h3
                    className={styles.productTitle}
                    animate={{
                      color: hoveredItem === item.desc ? 'var(--primary-600)' : 'var(--neutral-900)'
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {item.title}
                  </motion.h3>
                  
                  {item.desc && (
                    <p className={styles.productDescription}>
                      {item.desc}
                    </p>
                  )}

                  <div className={styles.cardFooter}>
                    <div className={styles.productFeatures}>
                      <span className={styles.feature}>高品质</span>
                      <span className={styles.feature}>耐用</span>
                      <span className={styles.feature}>精工</span>
                    </div>
                    
                    <motion.div
                      className={styles.arrowIcon}
                      animate={{
                        x: hoveredItem === item.desc ? 5 : 0,
                        opacity: hoveredItem === item.desc ? 1 : 0.6
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path 
                          d="M9 18L15 12L9 6" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        />
                      </svg>
                    </motion.div>
                  </div>
                </div>

                {/* 光晕效果 */}
                <motion.div
                  className={styles.cardGlow}
                  animate={{
                    opacity: hoveredItem === item.desc ? 0.6 : 0,
                    scale: hoveredItem === item.desc ? 1.1 : 1
                  }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* 查看更多按钮 */}
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className={styles.viewMoreSection}
        >
          <motion.button
            className={`btn btn-primary ${styles.viewMoreButton}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/product')}
          >
            查看所有产品
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
        </motion.div> */}
      </div>
    </section>
  );
}

export default ProductInfo;
