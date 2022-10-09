import React from 'react';
import styles from './index.module.css';


interface IProps {
  title: string
  showDesc?: boolean,
  showSperator?: boolean,
  titleClass?: string,
}
function SectionHeader({
  title,
  showDesc = true,
  showSperator = true,
  titleClass = 'justify-content-center',
}: IProps) {

  return (
    <>
    <h2 className={`h2 mb-4 d-flex  fw-bold ${titleClass}`}>{title}</h2>
    {
      showSperator && (
        <div className={styles.separator}>
      <div className={styles.separatorBorder}></div>
    </div>  
      )
    }
    
    {
      showDesc && (<h4 className="h4 mb-4 d-flex justify-content-center fw-normal">Xiangying Hardware</h4>)
    }
    </>
  );
}

export default SectionHeader;
