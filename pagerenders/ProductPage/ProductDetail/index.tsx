import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import ProductMenu from './components/ProductMenu'
import ProductItemList from './components/ProductItemList'
import ProductItemInfo from './components/ProductItemInfo'
import { ProductInfos } from '../../../constants/productInfo'
import styles from './index.module.css'

interface ProductDetailProps {
  productCateGory: string
  id?: string
}

function ProductDetail({ productCateGory, id }: ProductDetailProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const router = useRouter()
  const { t } = useTranslation('common')
  const categoryProducts = useMemo(() => {
    const productInfos: any = ProductInfos(t)
    return productInfos[productCateGory] || []
  }, [productCateGory, t])
  const selectedProductItem = id ? categoryProducts.find((item: any) => item.id === id) : undefined
  const producItemDetailShow = Boolean(selectedProductItem)

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const { ref: contentRef } = useInView({
    threshold: 0.05,
    triggerOnce: true,
  })

  useEffect(() => {
    setIsMenuOpen(false)
  }, [productCateGory, id])

  useEffect(() => {
    const media = window.matchMedia('(max-width: 992px)')
    const sync = () => {
      setIsMobile(media.matches)
      if (!media.matches) setIsMenuOpen(false)
    }
    sync()
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (!isMenuOpen) {
      dialog.close()
      return
    }
    dialog.showModal()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      dialog.close()
      document.body.style.overflow = previousOverflow
    }
  }, [isMenuOpen, isMobile])

  const handleProductItemClick = useCallback((productItem: any) => {
    if (!productItem?.path) {
      return
    }

    setIsMenuOpen(false)
    router.push(productItem.path, undefined, { scroll: false })
  }, [router])

  const handleMenuClick = useCallback(() => {
    setIsMenuOpen(false)
  }, [])

  const toggleMobileMenu = useCallback(() => {
    setIsMenuOpen((current) => !current)
  }, [])

  // 优化的动画变体
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  }

  const slideVariants = {
    enter: {
      opacity: 0,
      x: 50,
      scale: 0.95
    },
    center: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      x: -50,
      scale: 0.95,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  }

  const breadcrumbItems = useMemo(() => {
    const productListPath = '/product'
    const items = [
      { label: t('product.production_category'), path: productListPath, active: !producItemDetailShow },
    ]

    if (producItemDetailShow && selectedProductItem?.desc) {
      items.push({
        label: selectedProductItem.desc,
        path: selectedProductItem.path || productListPath,
        active: true,
      })
    }

    return items
  }, [t, producItemDetailShow, selectedProductItem?.desc, selectedProductItem?.path])

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
      className={styles.productDetailSection}
    >
      {/* 背景装饰 */}
      <div className={styles.backgroundDecoration}>
        <div className={styles.decorationCircle1}></div>
        <div className={styles.decorationCircle2}></div>
        <div className={styles.decorationWave}></div>
      </div>

      <div className={styles.container}>
        {/* 增强的头部区域 */}
        <motion.div
          variants={itemVariants}
          className={styles.headerSection}
        >
          <div className={styles.breadcrumbWrapper}>
            <motion.nav
              className={styles.breadcrumb}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {breadcrumbItems.map((item, index) => (
                <div key={index} className={styles.breadcrumbItem}>
                  {index > 0 && <span className={styles.breadcrumbSeparator}>{'/'}</span>}
                  <Link
                    href={item.path}
                    className={`${styles.breadcrumbText} ${item.active ? styles.breadcrumbActive : ''}`}
                    aria-current={item.active ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                </div>
              ))}
            </motion.nav>

            {/* 产品统计信息 */}
            <motion.div
              className={styles.productStats}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <div className={styles.statItem}>
                <span className={styles.statNumber}>
                  {categoryProducts.length}
                </span>
                <span className={styles.statLabel}>{t('product.products_available')}</span>
              </div>
              {producItemDetailShow && (
                <motion.div
                  className={styles.statItem}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className={styles.statIcon}>🎯</span>
                  <span className={styles.statLabel}>{t('product.current_product')}</span>
                </motion.div>
              )}
            </motion.div>
          </div>

        </motion.div>

        <motion.div
          ref={contentRef}
          className={styles.contentWrapper}
          variants={itemVariants}
        >
          {/* 移动端菜单按钮 */}
          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            onClick={toggleMobileMenu}
            className={styles.mobileMenuToggle}
            aria-expanded={isMenuOpen}
            aria-controls="product-detail-menu"
          >
            <motion.div
              animate={{ rotate: isMenuOpen ? 90 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.div>
            <span>{t('product.production_category')}</span>
            <motion.div
              className={styles.menuToggleIndicator}
              animate={{ rotate: isMenuOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.div>
          </motion.button>

          {/* 增强的侧边栏 */}
          {!isMobile && <aside
            id="product-detail-menu"
            className={styles.sidebar}
          >
            <motion.div
              className={styles.sidebarContent}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <ProductMenu handleMenuClick={handleMenuClick} />
            </motion.div>
          </aside>}

          {/* 增强的主内容区域 */}
          <motion.div
            variants={itemVariants}
            className={styles.mainContent}
          >
            {/* 内容切换动画 */}
            <AnimatePresence mode="wait">
              {producItemDetailShow ? (
                <motion.div
                  key="product-info"
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className={styles.productInfoWrapper}
                >
                  <ProductItemInfo
                    productItem={selectedProductItem}
                    productCateGory={productCateGory}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="product-list"
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className={styles.productListWrapper}
                >
                  <ProductItemList
                    productCateGory={productCateGory}
                    handleProductItemClick={handleProductItemClick}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {isMobile && createPortal(
          <dialog
            ref={dialogRef}
            id="product-detail-menu"
            className={styles.sidebarDialog}
            aria-label={t('product.production_category')}
            onCancel={() => setIsMenuOpen(false)}
            onClick={(event) => {
              if (event.target === event.currentTarget) setIsMenuOpen(false)
            }}
          >
            <button type="button" className={styles.menuClose} onClick={() => setIsMenuOpen(false)} aria-label={t('common.close')}>
              <span aria-hidden="true">×</span>
            </button>
            <ProductMenu handleMenuClick={handleMenuClick} />
          </dialog>,
          document.body,
        )}
      </div>

    </motion.section>
  )
}

export default ProductDetail
