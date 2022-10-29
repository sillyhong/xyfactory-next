import React from 'react';
import { useTranslation } from 'next-i18next'
import styles from './index.module.css';


interface IProps {
  title: string
  showDesc?: boolean,
  showSperator?: boolean,
  titleClass?: string
  animateClass?: string,
}
function SectionHeader({
  title,
  showDesc = true,
  showSperator = true,
  animateClass = 'animate__animated animate__rotateIn',
  titleClass = 'justify-content-center',

}: IProps) {
  const { t} = useTranslation('common')

  return (
    <div className={animateClass}>
    <h2 className={`h2 mb-4 d-flex  fw-bold ${titleClass} `}>{title}</h2>
    {
      showSperator && (
        <div className={styles.separator}>
      <div className={styles.separatorBorder}></div>
    </div>  
      )
    }
    
    {
      showDesc && (<h4 className="h4 mb-4 d-flex justify-content-center fw-normal">{t('home_about_us.sub_title')}</h4>)
    }
    </div>
  );
}

export default SectionHeader;
