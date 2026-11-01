import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import styles from './index.module.css';

function SectionTransition() {
  const shouldReduceMotion = useReducedMotion();
  const motionEnabled = shouldReduceMotion !== true;

  return (
    <section className={styles.sectionTransition} aria-hidden="true">
      <motion.div
        className={styles.transitionLine}
        initial={motionEnabled ? { opacity: 0, scaleX: 0.88 } : false}
        whileInView={motionEnabled ? { opacity: 1, scaleX: 1 } : undefined}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true, margin: '-10% 0px' }}
      />
    </section>
  );
}

export default SectionTransition;
