import React from 'react';
import styles from './index.module.css';


interface IProps {
  title: string
}
function SectionHeader(props: IProps) {

  return (
    <>
    <h2 className="h2 mb-4 d-flex justify-content-center fw-bold">{props.title}</h2>
    <div className={styles.separator}>
      <div className={styles.separatorBorder}></div>
    </div>  
    <h4 className="h4 mb-4 d-flex justify-content-center fw-normal">Xiangying Hardware</h4>
    </>
  );
}

export default SectionHeader;
