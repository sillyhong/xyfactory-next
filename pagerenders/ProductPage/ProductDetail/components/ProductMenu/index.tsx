import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { ProductCategories } from '../../../../../constants/index';
import styles from './index.module.css';

interface ProductMenuProps {
  handleMenuClick?: () => void;
}

function ProductMenu({ handleMenuClick }: ProductMenuProps) {
  const { t } = useTranslation('common');
  const router = useRouter();
  const asPath = router?.asPath || '';
    
  const handleItemClick = (path: string) => {
    router.push(path);
    handleMenuClick && handleMenuClick();
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={styles.productMenu}
    >
      <motion.div variants={itemVariants} className={styles.menuHeader}>
        <h3 className={styles.menuTitle}>
          {t('product.production_category')}
        </h3>
        <div className={styles.menuSubtitle}>
          {t('product.choose_category')}
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className={styles.menuList}>
        {ProductCategories(t).map((item) => {
          const isActive = asPath.split('#')[1]?.split('?')[0] === item.key;
          
          return (
            <motion.button
              key={item.path}
              type="button"
              aria-current={isActive ? 'page' : undefined}
              variants={itemVariants}
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
              className={`${styles.menuItem} ${isActive ? styles.menuItemActive : ''}`}
              onClick={() => handleItemClick(item.path)}
            >
              <div className={styles.menuItemContent}>
                <div className={styles.menuItemIcon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path 
                      d="M13 2L3 14H12L11 22L21 10H12L13 2Z" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className={styles.menuItemText}>{item.label}</span>
                <div className={styles.menuItemArrow}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path 
                      d="M9 18L15 12L9 6" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
              
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className={styles.activeIndicator}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.button>
          );
        })}
      </motion.div>

      <motion.div variants={itemVariants} className={styles.menuFooter}>
        <div className={styles.menuStats}>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>{ProductCategories(t).length}</span>
            <span className={styles.statLabel}>{t('product.categories_total')}</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default ProductMenu;
