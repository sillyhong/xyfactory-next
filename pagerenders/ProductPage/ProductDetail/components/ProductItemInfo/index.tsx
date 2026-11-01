import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { IconType } from 'react-icons'
import {
  FiAward,
  FiColumns,
  FiCircle,
  FiDroplet,
  FiHash,
  FiInfo,
  FiLayers,
  FiMapPin,
  FiMaximize2,
  FiPackage,
  FiTarget,
} from 'react-icons/fi'
import { useInView } from 'react-intersection-observer'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useProductFavorites } from '@/utils/useProductFavorites'
import ModernImage from '@components/ModernImage'
import SectionHeader from '@/components/SectionHeader'
import Carousel from '../../../../../components/Carousel'
import { ProductCategoriesLabel } from '../../../../../constants'
import styles from './index.module.css'

interface ProductItemInfoProps {
  productItem: any
  productCateGory: string
}

function ProductItemInfo({ productItem, productCateGory }: ProductItemInfoProps) {
  const { t } = useTranslation('common')
  const router = useRouter()
  const { isFavorite, toggleFavorite } = useProductFavorites(productItem?.path || '')
  const [activeTab, setActiveTab] = useState('specifications')
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  const { ref: infoRef, inView: infoInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const { ref: detailsRef, inView: detailsInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const { srcArr = [], profile = {}, detail = {}, desc = '' } = productItem || {}
  const galleryImages = useMemo(
    () => srcArr || [],
    [srcArr],
  )

  useEffect(() => {
    setSelectedImageIndex(0)
  }, [productItem])

  // 标签数据
  const tabs = [
    { id: 'specifications', label: t('product.specifications'), icon: '📋' },
    { id: 'details', label: t('product.product_details'), icon: '🔍' },
    { id: 'features', label: t('product.features'), icon: '⭐' }
  ]

  // Detail keys are localized labels in ProductInfos, so support both labels and canonical keys.
  const detailIconByLabel = useMemo<Record<string, IconType>>(() => ({
    [t('product.product_labels.product_brand_name')]: FiAward,
    [t('product.product_labels.place_of_origin')]: FiMapPin,
    [t('product.product_labels.product_name')]: FiPackage,
    [t('product.product_labels.product_no')]: FiHash,
    [t('product.product_labels.product_material')]: FiLayers,
    [t('product.product_labels.product_finish')]: FiDroplet,
    [t('product.product_labels.product_diameter')]: FiCircle,
    [t('product.product_labels.product_outer_diameter')]: FiTarget,
    [t('product.product_labels.product_size')]: FiMaximize2,
    [t('product.product_labels.product_glass_thinkness')]: FiColumns,
    brand_name: FiAward,
    product_brand_name: FiAward,
    place_of_origin: FiMapPin,
    product_name: FiPackage,
    product_no: FiHash,
    product_material: FiLayers,
    product_finish: FiDroplet,
    product_diameter: FiCircle,
    product_outer_diameter: FiTarget,
    product_size: FiMaximize2,
    product_glass_thinkness: FiColumns,
  }), [t])

  // 规格表格渲染
  const renderSpecificationTable = useMemo(() => {
    const values: any = Object.values(profile)
    const keys = Object.keys(profile)

    if (keys.length === 0) return null

    return (
      <div className={styles.specificationTable}>
        <div className={styles.tableHeader}>
          <h4>{t('product.product_specifications')}</h4>
          <div className={styles.tableCount}>
            {keys.length} {t('product.specifications_count')}
          </div>
        </div>
        <div className={styles.tableContent}>
          {keys.map((key, index) => (
            <motion.div
              key={key}
              className={styles.specRow}
              initial={{ opacity: 0, x: -20 }}
              animate={infoInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className={styles.specLabel}>
                <span className={styles.specIcon}>•</span>
                {t(key)}
              </div>
              <div className={styles.specValue}>{values[index]}</div>
            </motion.div>
          ))}
        </div>
      </div>
    )
  }, [profile, t, infoInView])

  // 详细信息表格渲染
  const renderDetailTable = useMemo(() => {
    const values: any = Object.values(detail)
    const keys = Object.keys(detail)

    if (keys.length === 0) return null

    return (
      <div className={styles.detailTable}>
        <div className={styles.tableHeader}>
          <h4>{t('product.detailed_information')}</h4>
          <div className={styles.tableCount}>
            {keys.length} {t('product.details_count')}
          </div>
        </div>
        <div className={styles.tableContent}>
          {keys.map((key, index) => {
            const DetailIcon = detailIconByLabel[key] || FiInfo

            return (
              <motion.div
                key={key}
                className={styles.detailRow}
                initial={{ opacity: 0, y: 20 }}
                animate={detailsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <div className={styles.detailLabel}>
                  <DetailIcon className={styles.detailIcon} aria-hidden="true" />
                  {t(key)}
                </div>
                <div className={styles.detailValue}>{values[index]}</div>
              </motion.div>
            )
          })}
        </div>
      </div>
    )
  }, [detail, detailIconByLabel, t, detailsInView])

  // 特征渲染
  const renderFeatures = useMemo(() => {
    const features = [
      { icon: '🛡️', title: t('product.feature_durability'), desc: t('product.feature_durability_desc') },
      { icon: '⚡', title: t('product.feature_efficiency'), desc: t('product.feature_efficiency_desc') },
      { icon: '🎯', title: t('product.feature_precision'), desc: t('product.feature_precision_desc') },
      { icon: '🔧', title: t('product.feature_maintenance'), desc: t('product.feature_maintenance_desc') }
    ]

    return (
      <div className={styles.featuresGrid}>
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            className={styles.featureCard}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={activeTab === 'features' ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <div className={styles.featureIcon}>{feature.icon}</div>
            <h5 className={styles.featureTitle}>{feature.title}</h5>
            <p className={styles.featureDesc}>{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    )
  }, [t, activeTab])

  // 动画变体
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  return (
    <motion.section
      ref={infoRef}
      initial="hidden"
      animate={infoInView ? "visible" : "hidden"}
      variants={containerVariants}
      className={styles.productInfoSection}
    >
      {/* 产品主体信息 */}
      <motion.div variants={itemVariants} className={styles.productMainInfo}>
        <div className={styles.imageSection}>
          {/* 产品图片轮播 */}
          <div className={styles.carouselWrapper}>
            <Carousel carouselList={galleryImages} desc={desc} variant="product" activeIndex={selectedImageIndex} onSelect={setSelectedImageIndex} autoPlay={false} />
          </div>

          {/* 缩略图网格 */}
          {galleryImages.length > 1 && (
            <motion.div
              className={styles.thumbnailGrid}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              {galleryImages.slice(0, 6).map((image: any, index: number) => (
                <motion.button
                  key={index}
                  type="button"
                  aria-label={`${desc} ${index + 1}`}
                  aria-pressed={selectedImageIndex === index}
                  className={`${styles.thumbnail} ${selectedImageIndex === index ? styles.thumbnailActive : ''}`}
                  onClick={() => setSelectedImageIndex(index)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ModernImage
                    src={image.src}
                    alt={`${desc} ${index + 1}`}
                    fill={false}
                    width={80}
                    height={80}
                    objectFit="cover"
                    className={styles.thumbnailImage}
                  />
                </motion.button>
              ))}
            </motion.div>
          )}
        </div>

        {/* 产品信息面板 */}
        <motion.div variants={itemVariants} className={styles.infoPanel}>
          <div className={styles.productHeader}>
            <div className={styles.productBadge}>
              <span className={styles.badgeIcon}>🏷️</span>
              <span>{t('product.product')}</span>
            </div>
            <h1 className={styles.productTitle}>{desc}</h1>
            <div className={styles.productMeta}>
              <div className={styles.categoryInfo}>
                <span className={styles.categoryLabel}>{t('product.production_category')}:</span>
                <span className={styles.categoryValue}>
                  {ProductCategoriesLabel(t)[productCateGory] || t('product.unknown_category')}
                </span>
              </div>
            </div>
          </div>

          {/* 产品亮点 */}
          <motion.div
            className={styles.productHighlights}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <h3 className={styles.highlightsTitle}>{t('product.product_highlights')}</h3>
            <div className={styles.highlightsList}>
              <div className={styles.highlightItem}>
                <span className={styles.highlightIcon}>✨</span>
                <span>{t('product.highlight_quality')}</span>
              </div>
              <div className={styles.highlightItem}>
                <span className={styles.highlightIcon}>🎯</span>
                <span>{t('product.highlight_precision')}</span>
              </div>
              <div className={styles.highlightItem}>
                <span className={styles.highlightIcon}>🛡️</span>
                <span>{t('product.highlight_durability')}</span>
              </div>
            </div>
          </motion.div>

          {/* 快速规格预览 */}
          {Object.keys(profile).length > 0 && (
            <motion.div
              className={styles.quickSpecs}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <h4 className={styles.quickSpecsTitle}>{t('product.quick_specifications')}</h4>
              <div className={styles.quickSpecsList}>
                {Object.entries(profile).slice(0, 3).map(([key, value]: [string, any], index) => (
                  <div key={key} className={styles.quickSpecItem}>
                    <span className={styles.quickSpecLabel}>{t(key)}</span>
                    <span className={styles.quickSpecValue}>{value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* 操作按钮 */}
          <motion.div
            className={styles.actionButtons}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <motion.button
              type="button"
              className={styles.primaryButton}
              onClick={() => router.push({ pathname: '/contact', query: { product: `${productItem.id}: ${desc}` } })}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className={styles.buttonIcon}>📞</span>
              {t('product.contact_for_quote')}
            </motion.button>
            <motion.button
              type="button"
              className={styles.secondaryButton}
              aria-pressed={isFavorite}
              onClick={toggleFavorite}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className={styles.buttonIcon}>💾</span>
              {t(isFavorite ? 'product.saved_to_favorites' : 'product.save_to_favorites')}
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* 详细信息标签页 */}
      <motion.div
        ref={detailsRef}
        variants={itemVariants}
        className={styles.detailsSection}
      >
        <div className={styles.tabsHeader}>
          <SectionHeader
            title={t('product.detailed_information')}
            animateClass='animate__animated animate__pulse'
            titleClass='justify-content-start'
            showDesc={false}
            showSperator={false}
          />
          <div className={styles.tabsNav}>
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                className={`${styles.tabButton} ${activeTab === tab.id ? styles.tabButtonActive : ''}`}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className={styles.tabIcon}>{tab.icon}</span>
                <span>{tab.label}</span>
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className={styles.activeTabIndicator}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* 标签页内容 */}
        <div className={styles.tabContent}>
          <AnimatePresence mode="wait">
            {activeTab === 'specifications' && (
              <motion.div
                key="specifications"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className={styles.tabPane}
              >
                {renderSpecificationTable}
              </motion.div>
            )}

            {activeTab === 'details' && (
              <motion.div
                key="details"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className={styles.tabPane}
              >
                {renderDetailTable}
              </motion.div>
            )}

            {activeTab === 'features' && (
              <motion.div
                key="features"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className={styles.tabPane}
              >
                {renderFeatures}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.section>
  )
}

export default ProductItemInfo
