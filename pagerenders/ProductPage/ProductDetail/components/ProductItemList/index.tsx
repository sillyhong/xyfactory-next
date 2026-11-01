import { useCallback, useDeferredValue, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useTranslation } from 'next-i18next'
import ModernImage from '@components/ModernImage'
import { ProductInfos } from '../../../../../constants/productInfo'
import { ProductCategoriesKey } from '../../../../../constants/index'
import styles from './index.module.css'

interface ProductItemListProps {
  productCateGory: string
  handleProductItemClick: (item: any) => void
}

function ProductItemList({ productCateGory, handleProductItemClick }: ProductItemListProps) {
  const { t } = useTranslation('common')
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('default')
  const deferredSearchTerm = useDeferredValue(searchTerm)

  const { ref: listRef, inView: listInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  // 获取产品数据
  const productItems: any = useMemo(() => {
    return ProductInfos(t)[productCateGory as ProductCategoriesKey] || []
  }, [productCateGory, t])

  const filteredAndSortedProducts = useMemo(() => {
    const query = deferredSearchTerm.trim().toLocaleLowerCase()
    const products = productItems.filter((item: any) =>
      [item.id, item.desc, ...Object.values(item.profile || {})].join(' ').toLocaleLowerCase().includes(query),
    )
    if (sortBy === 'name') {
      products.sort((left: any, right: any) => left.desc.localeCompare(right.desc))
    } else if (sortBy === 'popular') {
      products.sort((left: any, right: any) => Number(Boolean(right.homeHot)) - Number(Boolean(left.homeHot)))
    }
    return products
  }, [deferredSearchTerm, productItems, sortBy])

  const handleItemClick = useCallback(
    (productItem: any) => {
      handleProductItemClick && handleProductItemClick(productItem)
    },
    [handleProductItemClick],
  )

  // 动画变体
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  const cardHoverVariants = {
    rest: {
      scale: 1,
      y: 0,
      rotateY: 0,
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)"
    },
    hover: {
      scale: 1.01,
      y: -4,
      rotateY: 0,
      boxShadow: "0 16px 36px rgba(15, 23, 42, 0.14)",
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  }

  return (
    <motion.section
      ref={listRef}
      initial="hidden"
      animate={listInView ? "visible" : "hidden"}
      variants={containerVariants}
      className={styles.productListSection}
    >
      {/* 头部控制区域 */}
      <motion.div variants={itemVariants} className={styles.listHeader}>
        <div className={styles.headerContent}>
          <div className={styles.headerInfo}>
            <h2 className={styles.sectionTitle}>
              {t('product.production_category')}
            </h2>
            <p className={styles.sectionSubtitle}>
              {t('product.discover_our_collection')}
            </p>
          </div>

          <div className={styles.productCount} role="status" aria-live="polite">
            <span className={styles.countNumber}>{filteredAndSortedProducts.length}</span>
            <span className={styles.countLabel}>{t('product.products_found')}</span>
          </div>
        </div>

        <motion.div
          variants={itemVariants}
          className={styles.controls}
        >
          <div className={styles.searchWrapper}>
            <div className={styles.searchIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
                <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <input
              type="search"
              aria-label={t('product.search_products')}
              placeholder={t('product.search_products')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
            {searchTerm && (
              <motion.button
                type="button"
                aria-label={t('product.clear_filters')}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={() => setSearchTerm('')}
                className={styles.clearButton}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.button>
            )}
          </div>

          <select
            aria-label={t('product.sort_default')}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={styles.sortSelect}
          >
            <option value="default">{t('product.sort_default')}</option>
            <option value="name">{t('product.sort_by_name')}</option>
            <option value="popular">{t('product.sort_by_popular')}</option>
          </select>
        </motion.div>
      </motion.div>

      {/* 产品网格 */}
      <motion.div
        variants={containerVariants}
        className={styles.productsGrid}
      >
        <AnimatePresence>
          {filteredAndSortedProducts.map((item: any, index: number) => (
            <motion.div
              key={item.id || index}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              layout
              className={styles.productCardWrapper}
            >
              <motion.div
                variants={cardHoverVariants}
                initial="rest"
                whileHover="hover"
                onHoverStart={() => setHoveredItem(item.id)}
                onHoverEnd={() => setHoveredItem(null)}
                onClick={() => handleItemClick(item)}
                className={styles.productCard}
                role="button"
                tabIndex={0}
                aria-label={`${t('product.view_details')}: ${item.desc}`}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    handleItemClick(item)
                  }
                }}
              >
                {/* 产品图片 */}
                <div className={styles.imageWrapper}>
                  <ModernImage
                    src={item.src}
                    alt={item.desc}
                    fill
                    containerClassName={styles.productImageContainer}
                    objectFit="contain"
                    className={styles.productImage}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={index < 2}
                  />

                  {/* 热门标签 */}
                  {item.homeHot && (
                    <motion.div
                      className={styles.hotTag}
                      initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                      animate={{ opacity: 1, scale: 1, rotate: -15 }}
                      transition={{ delay: 0.2, duration: 0.4 }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M8.5 14.5L8 16L5.5 13.5L8 11L8.5 12.5L11 15L16.5 9.5L15 8L11 12L8.5 14.5Z" fill="currentColor"/>
                      </svg>
                      <span>{t('product.hot')}</span>
                    </motion.div>
                  )}

                </div>

                {/* 产品信息 */}
                <div className={styles.cardContent}>
                  <div className={styles.productInfo}>
                    <h3 className={styles.productTitle}>{item.desc}</h3>
                    <p className={styles.productDescription}>
                      {item.profile[t('product.product_labels.product_material')]
                        ? `${t('product.product_labels.product_material')}: ${item.profile[t('product.product_labels.product_material')]}`
                        : t('product.quality_guarantee')}
                    </p>
                  </div>

                  {/* 产品特征标签 */}
                  <div className={styles.featureTags}>
                    <span className={styles.featureTag}>
                      {t('product.durable')}
                    </span>
                    <span className={styles.featureTag}>
                      {t('product.premium')}
                    </span>
                  </div>

                  {/* 操作按钮 */}
                  <motion.span
                    className={styles.detailButton}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>{t('product.btn_detail')}</span>
                    <motion.div
                      className={styles.buttonIcon}
                      animate={{ x: hoveredItem === item.id ? 4 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12H19M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </motion.div>
                  </motion.span>
                </div>

              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* 无结果状态 */}
      <AnimatePresence>
        {filteredAndSortedProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className={styles.emptyState}
          >
            <div className={styles.emptyIcon}>
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
                <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className={styles.emptyTitle}>{t('product.no_products_found')}</h3>
            <p className={styles.emptyDescription}>
              {t('product.try_different_search')}
            </p>
            <motion.button
              className={styles.clearFiltersButton}
              onClick={() => { setSearchTerm(''); setSortBy('default') }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('product.clear_filters')}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  )
}

export default ProductItemList
