import { useCallback, useEffect, useMemo, useState } from 'react'
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
  const [producItemDetailShow, setProducItemDetailShow] = useState(false)
  const [selectedProductItem, setSelectedProductItem] = useState<any>({})
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()
  const { t } = useTranslation('common')
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  useEffect(() => {
    if (id) {
      const productInfos: any = ProductInfos(t)
      const productsByCateGory = productInfos[productCateGory]
      if (productsByCateGory?.length) {
        const product = productsByCateGory.find((item: any) => item.id === id)
        if (product) {
          setSelectedProductItem(product)
          setProducItemDetailShow(true)
        }
      }
    }
  }, [id, productCateGory, t])

  const handleProductItemClick = useCallback((productItem: any) => {
    if (!producItemDetailShow) {
      setProducItemDetailShow(true)
      setSelectedProductItem(productItem)
      router.push(`/${router.locale}${productItem.path}`)
    }
  }, [producItemDetailShow, router])

  const handleMenuClick = useCallback(() => {
    setProducItemDetailShow(false)
    setSelectedProductItem({})
    setIsMenuOpen(false)
  }, [])

  const toggleMobileMenu = useCallback(() => {
    setIsMenuOpen(!isMenuOpen)
  }, [isMenuOpen])

  const handleBackToList = useCallback(() => {
    setProducItemDetailShow(false)
    setSelectedProductItem({})
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1
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

  const slideVariants = {
    enter: { opacity: 0, x: 50 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 }
  }

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
      className={styles.productDetailSection}
    >
      <div className={styles.container}>
        {/* Header Section */}
        <motion.div 
          variants={itemVariants} 
          className={styles.headerSection}
        >
          <div className={styles.breadcrumb}>
            <span className={styles.breadcrumbItem}>{t('nav.nav_home')}</span>
            <span className={styles.breadcrumbSeparator}>{'>'}</span>
            <span className={styles.breadcrumbItem}>{t('nav.nav_products')}</span>
            <span className={styles.breadcrumbSeparator}>{'>'}</span>
            <span className={styles.breadcrumbActive}>
              {producItemDetailShow ? selectedProductItem?.desc : t('product.production_category')}
            </span>
          </div>
          
          {producItemDetailShow && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={handleBackToList}
              className={styles.backButton}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M19 12H5M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {t('common.back_to_list')}
            </motion.button>
          )}
        </motion.div>

        <div className={styles.contentWrapper}>
          {/* Mobile Menu Toggle */}
          <motion.button
            variants={itemVariants}
            onClick={toggleMobileMenu}
            className={styles.mobileMenuToggle}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {t('product.production_category')}
          </motion.button>

          {/* Sidebar */}
          <motion.aside 
            variants={itemVariants}
            className={`${styles.sidebar} ${isMenuOpen ? styles.sidebarOpen : ''}`}
          >
            <div className={styles.sidebarContent}>
              <ProductMenu handleMenuClick={handleMenuClick} />
            </div>
          </motion.aside>

          {/* Main Content */}
          <motion.main 
            variants={itemVariants}
            className={styles.mainContent}
          >
            <AnimatePresence mode="wait">
              {producItemDetailShow ? (
                <motion.div
                  key="product-info"
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className={styles.productInfoWrapper}
                >
                  <ProductItemInfo 
                    productItem={selectedProductItem} 
                    productCateGory={productCateGory}
                    onBack={handleBackToList}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="product-list"
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className={styles.productListWrapper}
                >
                  <ProductItemList 
                    productCateGory={productCateGory} 
                    handleProductItemClick={handleProductItemClick}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.main>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={styles.mobileMenuOverlay}
              onClick={() => setIsMenuOpen(false)}
            />
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  )
}

export default ProductDetail


