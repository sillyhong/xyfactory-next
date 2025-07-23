import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { PlaceholderValue } from 'next/dist/shared/lib/get-img-props';
import styles from './index.module.css';

interface ModernImageProps {
  src: any;
  alt: string;
  className?: string;
  containerClassName?: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  aspectRatio?: string;
  rounded?: boolean;
  shadow?: boolean;
  overlay?: boolean;
  overlayContent?: React.ReactNode;
  loading?: 'lazy' | 'eager'; // Note: automatically set to 'eager' when priority is true
  quality?: number;
  onClick?: () => void;
  hoverEffect?: boolean;
  zoomOnHover?: boolean;
  placeholder?: PlaceholderValue;
}

const ModernImage: React.FC<ModernImageProps> = ({
  src,
  alt,
  className = '',
  containerClassName = '',
  width,
  height,
  fill = false,
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  objectFit = 'cover',
  aspectRatio,
  rounded = false,
  shadow = false,
  overlay = false,
  overlayContent,
  loading = 'lazy',
  quality = 85,
  onClick,
  hoverEffect = false,
  zoomOnHover = false,
  placeholder = 'blur',
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const containerClasses = [
    styles.imageContainer,
    containerClassName,
    rounded ? styles.rounded : '',
    shadow ? styles.shadow : '',
    hoverEffect ? styles.hoverEffect : '',
    zoomOnHover ? styles.zoomOnHover : '',
    onClick ? styles.clickable : '',
  ].filter(Boolean).join(' ');

  const imageClasses = [
    styles.image,
    className,
  ].filter(Boolean).join(' ');

  const containerStyle: React.CSSProperties = {
    ...(aspectRatio && { aspectRatio }),
    ...(width && !fill && { width }),
    ...(height && !fill && { height }),
  };

  return (
    <motion.div
      className={containerClasses}
      style={containerStyle}
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* 加载状态 */}
      {isLoading && (
        <div className={styles.loadingOverlay}>
          <div className={styles.spinner}></div>
        </div>
      )}

      {/* 错误状态 */}
      {hasError && (
        <div className={styles.errorOverlay}>
          <div className={styles.errorIcon}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <p className={styles.errorText}>图片加载失败</p>
        </div>
      )}

      {/* 主图片 */}
      {!hasError && (
        <Image
          src={src}
          alt={alt}
          className={imageClasses}
          width={!fill ? width : undefined}
          height={!fill ? height : undefined}
          fill={fill}
          sizes={fill ? sizes : undefined}
          priority={priority}
          loading={priority ? 'eager' : loading}
          quality={quality}
          onLoad={handleLoad}
          onError={handleError}
          style={{
            objectFit: fill ? objectFit : undefined,
          }}
          placeholder={typeof src === 'string' ? 'empty' : placeholder}
        />
      )}

      {/* 覆盖层 */}
      {overlay && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {overlayContent}
        </motion.div>
      )}

      {/* 光晕效果 */}
      {hoverEffect && (
        <motion.div
          className={styles.glow}
          initial={{ opacity: 0, scale: 1 }}
          whileHover={{ opacity: 0.3, scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.div>
  );
};

export default ModernImage; 