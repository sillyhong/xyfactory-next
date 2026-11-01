import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ProductInfos } from '../../../constants/productInfo';
import { ProductCategories } from '@/constants';
import Image from 'next/image';
import SectionHeader from '../../../components/SectionHeader';
import styles from './index.module.css';

function ProductList() {
    const { t } = useTranslation('common');
    const { ref, inView } = useInView({
        threshold: 0.2,
        triggerOnce: true,
    });

    const productInfos = ProductInfos(t);
    const categories = ProductCategories(t).map((category) => {
        const products = productInfos[category.key];
        // A shared product must not remove a category from the overview.
        const cover = products.find((product) => product.path.startsWith(`${category.path}?`)) || products[0];
        return { ...category, cover };
    });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.8,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    return (
        <motion.section
            ref={ref}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={containerVariants}
            className={styles.productListSection}
        >
            <div className={styles.container}>
                <motion.div className={styles.headerSection} variants={itemVariants}>
                    <SectionHeader
                        title={t('nav.nav_products')}
                        animateClass="animate__animated animate__pulse"
                        titleClass="text-center"
                        showDesc={false}
                        showSperator={false}
                    />
                    <p className={styles.sectionDescription}>
                        {t('product.section_description')}
                    </p>
                </motion.div>

                <motion.div 
                    className={styles.productsGrid}
                    variants={containerVariants}
                >
                    {categories.map((item, index) => (
                        <motion.div
                            key={item.key}
                            variants={itemVariants}
                            className={styles.productCard}
                            whileHover={{ y: -8 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Link href={item.path} className={styles.cardContainer}>
                                <div className={styles.imageSection}>
                                    <div className={styles.imageWrapper}>
                                        <Image
                                            src={item.cover.src}
                                            alt={item.label}
                                            width={400}
                                            height={300}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            priority={index < 3}
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                            className={styles.productImage}
                                        />
                                    </div>
                                    <div className={styles.categoryBadge}>
                                        <span className={styles.categoryLabel}>
                                            {t('product.category_label')}
                                        </span>
                                    </div>
                                </div>

                                <div className={styles.cardContent}>
                                    <motion.h3
                                        className={styles.productTitle}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        {item.label}
                                    </motion.h3>
                                    
                                    <p className={styles.productDescription}>
                                        {t('product.quality_guarantee')}
                                    </p>

                                    <div className={styles.cardActions}>
                                        <span
                                            className={`btn btn-outline-primary ${styles.actionButton}`}
                                        >
                                            {t('home_about_us.text_view_more')}
                                        </span>
                                    </div>
                                </div>

                                <div className={styles.cardGlow}></div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div className={styles.bottomSection} variants={itemVariants}>
                    <p className={styles.bottomText}>
                        {t('product.explore_more_text')}
                    </p>
                </motion.div>
            </div>
        </motion.section>
    );
}

export default ProductList;


