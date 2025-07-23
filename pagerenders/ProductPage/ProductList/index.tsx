import { useMemo } from 'react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ProductInfos } from '../../../constants/productInfo';
import Image from 'next/image';
import SectionHeader from '../../../components/SectionHeader';
import styles from './index.module.css';

function ProductList() {
    const { t } = useTranslation('common');
    const router = useRouter();
    const { ref, inView } = useInView({
        threshold: 0.2,
        triggerOnce: true,
    });

    const showFirstFromAll = useMemo(() => {
        /* 只展示每个系列的第一项 */
        const showProducts: any = [];
        const currentProductInfos: any = ProductInfos(t);
        const productKeys = Object.keys(currentProductInfos);
        productKeys.forEach(key => {
            const firstProduct = currentProductInfos[key]?.[0];
            if (firstProduct && !showProducts.includes(firstProduct))
                showProducts.push(firstProduct);
        });
        return showProducts;
    }, [t]);

    const handleProductItemClick = (path: string) => {
        router.push(path);
    };

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
                    {showFirstFromAll.map((item: any, index: number) => (
                        <motion.div
                            key={item.desc + index}
                            variants={itemVariants}
                            className={styles.productCard}
                            onClick={() => handleProductItemClick(item.path)}
                            whileHover={{ y: -8 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <div className={styles.cardContainer}>
                                <div className={styles.imageSection}>
                                    <div className={styles.imageWrapper}>
                                        <Image
                                            src={item.src}
                                            alt={item.desc}
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
                                        {item.desc}
                                    </motion.h3>
                                    
                                    <p className={styles.productDescription}>
                                        {t('product.quality_guarantee')}
                                    </p>

                                    <div className={styles.cardActions}>
                                        <motion.button
                                            className={`btn btn-outline-primary ${styles.actionButton}`}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            {t('home_about_us.text_view_more')}
                                        </motion.button>
                                    </div>
                                </div>

                                <div className={styles.cardGlow}></div>
                            </div>
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


