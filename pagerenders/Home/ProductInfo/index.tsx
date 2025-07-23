import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ModernImage from '@components/ModernImage';
import SectionHeader from '@components/SectionHeader';
import { ProductInfos } from '../../../constants/productInfo';
import { ProductCategoriesKey, ProductCategoriesLabel } from '../../../constants';
import styles from './index.module.css';

function ProductInfo() {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const newProducts = useMemo(() => {
    const productInfos = ProductInfos(t);
    const categoriesLabel = ProductCategoriesLabel(t);
    const homeNewProducts: any[] = [];
    
    // 遍历各个产品类别，为每个产品添加title字段
    Object.entries(productInfos).forEach(([categoryKey, products]: [string, any[]]) => {
      products.forEach((product: any) => {
        if (product?.homeProductCategory === true && !homeNewProducts.find(p => p.id === product.id)) {
          // 为产品添加title字段和类别信息
          const enhancedProduct = {
            ...product,
            title: categoriesLabel[categoryKey] || '产品分类',
            categoryKey,
            categoryLabel: categoriesLabel[categoryKey]
          };
          homeNewProducts.push(enhancedProduct);
        }
      });
    });
    
    return homeNewProducts;
  }, [t]);

  const handleItemClick = (item: any) => {
    router.push(item.path);
  };

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
      y: 50,
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

  return (
    <section className={`${styles.productInfoSection} section-padding`} ref={ref}>
      <div className="container-modern">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className={styles.sectionHeaderWrapper}
        >
          <SectionHeader 
            title={t('home_product_categories.sub_title')} 
            showDesc={false}
            titleClass="text-center"
          />
          <p className={styles.sectionDescription}>
            {t('home_product_categories.description', '探索我们丰富的产品类别，涵盖门把手、淋浴铰链、玻璃配件等多个领域')}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className={styles.productsGrid}
        >
          {newProducts.map((item, index) => (
            <motion.div
              key={item.id || item.desc + index}
              variants={itemVariants}
              className={styles.productCategoryCard}
              onClick={() => handleItemClick(item)}
            >
              <div className={styles.cardContainer}>
                <div className={styles.imageSection}>
                  <ModernImage
                    src={item.src}
                    alt={item.title || '产品图片'}
                    fill={false}
                    width={400}
                    height={240}
                    objectFit="cover"
                    rounded
                    hoverEffect
                    zoomOnHover
                    overlay
                    overlayContent={
                      <div className={styles.overlayContent}>
                        <motion.button
                          className={`btn btn-primary ${styles.exploreButton}`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {t('common.explore_category', '探索分类')}
                        </motion.button>
                      </div>
                    }
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                    priority={index < 2}
                  />
                  
                  <div className={styles.categoryBadge}>
                    <span className={styles.categoryLabel}>
                      {t('common.product_category', '产品分类')}
                    </span>
                  </div>
                </div>

                <div className={styles.cardContent}>
                  <motion.h3
                    className={styles.categoryTitle}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {item.title}
                  </motion.h3>
                  
                  <p className={styles.categoryDescription}>
                    {item.desc || `专业级${item.title}产品，工艺精湛，品质可靠`}
                  </p>

                  <div className={styles.cardFooter}>
                    <div className={styles.featureList}>
                      <span className={styles.featureItem}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        {t('common.high_quality', '高品质')}
                      </span>
                      <span className={styles.featureItem}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        {t('common.multiple_styles', '多样式')}
                      </span>
                    </div>
                    
                    <motion.div
                      className={styles.arrowIcon}
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
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
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* 查看更多按钮 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className={styles.viewMoreSection}
        >
          <motion.button
            className={`btn btn-outline ${styles.viewMoreButton}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/product')}
          >
            {t('common.view_all_categories', '查看所有产品分类')}
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
    </section>
  );
}

export default ProductInfo;
