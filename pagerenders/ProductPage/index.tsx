import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from "next/router";
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import ProductList from "./ProductList";
import styles from './index.module.css';
import { ProductCategories } from '@/constants';

const ProductDetail = dynamic(() => import('./ProductDetail'));

const Product = () => {
  const router = useRouter();
  const { t } = useTranslation('common');
  const { asPath = '' } = router || {};
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const productRoute = useMemo(() => {
    const routePath = mounted ? asPath : '';
    const hash = routePath.split('#')[1] || '';
    if (!hash) {
      return {
        hasHash: false,
        category: '',
        id: '',
      };
    }

    const [category = '', query = ''] = hash.split('?');
    const params = new URLSearchParams(query);

    return {
      hasHash: ProductCategories(t).some((item) => item.key === category),
      category,
      id: params.get('id') || '',
    };
  }, [asPath, mounted, t]);

  const currentView = productRoute.hasHash && productRoute.id ? 'detail' : 'list';

  // 页面过渡动画配置
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20,
      scale: 0.98
    },
    in: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1]
      }
    },
    out: {
      opacity: 0,
      y: -20,
      scale: 1.02,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  const renderContent = () => {
    if (productRoute.hasHash) {
      return (
        <motion.div
          key={`category-${productRoute.category}`}
          variants={pageVariants}
          initial="initial"
          animate="in"
          exit="out"
          className={styles.pageContent}
        >
          <ProductDetail productCateGory={productRoute.category} id={productRoute.id} />
        </motion.div>
      );
    }

    return (
      <motion.div
        key="list"
        variants={pageVariants}
        initial="initial"
        animate="in"
        exit="out"
        className={styles.pageContent}
      >
        <ProductList />
      </motion.div>
    );
  };

  return (
    <div className={styles.productPageContainer}>
      {/* 页面背景装饰 */}
      <div className={styles.pageBackground}>
        <div className={styles.backgroundPattern}></div>
        <div className={styles.backgroundGradient}></div>
      </div>

      {/* 页面头部指示器 */}
      <motion.div
        className={styles.pageIndicator}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className={styles.indicatorContent}>
          <motion.div
            className={`${styles.indicatorDot} ${currentView === 'list' ? styles.active : ''}`}
            animate={{ scale: currentView === 'list' ? 1.2 : 1 }}
          />
          <div className={styles.indicatorLine}></div>
          <motion.div
            className={`${styles.indicatorDot} ${currentView === 'detail' ? styles.active : ''}`}
            animate={{ scale: currentView === 'detail' ? 1.2 : 1 }}
          />
        </div>
        <p className={styles.indicatorLabel}>
          {currentView === 'list' ? t('nav.nav_products') : t('product.product_details')}
        </p>
      </motion.div>

      {/* 主要内容区域 */}
      <div className={styles.mainContent}>
        <AnimatePresence mode="wait">{renderContent()}</AnimatePresence>
      </div>

      {/* 页面底部装饰 */}
      {/* <div className={styles.pageFooterDecoration}>
        <motion.div
          className={styles.decorationLine}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
        />
      </div> */}
    </div>
  );
};

export default Product;
