import Carousel from 'react-bootstrap/Carousel';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { checkIsMobile } from '@/utils/mobile';
import styles from './index.module.css';

interface CarouselItem {
  src: any;
  title?: string;
  desc?: string;
}

interface CarouselProps {
  carouselList: CarouselItem[];
  desc?: string;
}

function CarouselComp({ carouselList, desc }: CarouselProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });

  useEffect(() => {
    const checkResult = checkIsMobile();
    setIsMobile(checkResult);
  }, []);

  useEffect(() => {
    if (!isPlaying || !inView) return;

    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % carouselList.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [carouselList.length, isPlaying, inView]);

  const handleSelect = (selectedIndex: number) => {
    setActiveIndex(selectedIndex);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const goToPrevious = () => {
    setActiveIndex((current) => 
      current === 0 ? carouselList.length - 1 : current - 1
    );
  };

  const goToNext = () => {
    setActiveIndex((current) => (current + 1) % carouselList.length);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={styles.carouselContainer}
    >
      <div className={styles.carouselWrapper}>
        <Carousel
          activeIndex={activeIndex}
          onSelect={handleSelect}
          controls={false}
          indicators={false}
          pause={false}
          className={styles.modernCarousel}
        >
          {carouselList.map((item, index) => (
            <Carousel.Item key={`carousel-${index}`} className={styles.carouselItem}>
              <div className={styles.imageContainer}>
                <motion.div
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className={styles.imageWrapper}
                >
                  <Image 
                    src={item.src} 
                    alt={item.title || desc || 'Carousel image'} 
                    width={1920}
                    height={1080}
                    style={{ 
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                    priority={index === 0}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    quality={90}
                    sizes="100vw"
                    className={styles.carouselImage}
                  />
                  <div className={styles.imageOverlay}></div>
                </motion.div>
              </div>
              
              {(item.title || item.desc) && !isMobile && (
                <motion.div
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className={styles.captionWrapper}
                >
                  <Carousel.Caption className={styles.modernCaption}>
                    <div className={styles.captionContent}>
                      {item.title && (
                        <motion.h2
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.7, duration: 0.6 }}
                          className={styles.captionTitle}
                        >
                          {item.title}
                        </motion.h2>
                      )}
                      {item.desc && (
                        <motion.p
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.9, duration: 0.6 }}
                          className={styles.captionDesc}
                        >
                          {item.desc}
                        </motion.p>
                      )}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.1, duration: 0.5 }}
                        className={styles.captionActions}
                      >
                        <button className={`btn btn-primary ${styles.actionButton}`}>
                          了解更多
                        </button>
                        <button className={`btn btn-outline ${styles.actionButton}`}>
                          联系我们
                        </button>
                      </motion.div>
                    </div>
                  </Carousel.Caption>
                </motion.div>
              )}
            </Carousel.Item>
          ))}
        </Carousel>

        {/* 自定义控制器 */}
        <div className={styles.customControls}>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={goToPrevious}
            className={`${styles.controlButton} ${styles.prevButton}`}
            aria-label="Previous slide"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={goToNext}
            className={`${styles.controlButton} ${styles.nextButton}`}
            aria-label="Next slide"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handlePlayPause}
            className={`${styles.controlButton} ${styles.playButton}`}
            aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
          >
            {isPlaying ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect x="6" y="4" width="4" height="16" fill="currentColor"/>
                <rect x="14" y="4" width="4" height="16" fill="currentColor"/>
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <polygon points="5,3 19,12 5,21" fill="currentColor"/>
              </svg>
            )}
          </motion.button>
        </div>

        {/* 自定义指示器 */}
        <div className={styles.customIndicators}>
          {carouselList.map((_, index) => (
            <motion.button
              key={`indicator-${index}`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleSelect(index)}
              className={`${styles.indicator} ${
                index === activeIndex ? styles.activeIndicator : ''
              }`}
              aria-label={`Go to slide ${index + 1}`}
            >
              <div className={styles.indicatorProgress}>
                {index === activeIndex && (
                  <motion.div
                    className={styles.progressBar}
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 5, ease: 'linear' }}
                    key={`progress-${activeIndex}`}
                  />
                )}
              </div>
            </motion.button>
          ))}
        </div>

        {/* 滚动提示 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
          className={styles.scrollHint}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className={styles.scrollIcon}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.div>
          <span className={styles.scrollText}>向下滚动探索更多</span>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default CarouselComp;
