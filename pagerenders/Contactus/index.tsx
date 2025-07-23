import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { ContactUs } from '@constants/contactus';
import styles from './index.module.css';

interface FormData {
  name: string;
  email: string;
  tel: string;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

function Contactus() {
  const { t } = useTranslation('common');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    tel: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [activeContact, setActiveContact] = useState<number>(0);

  const { ref: heroRef, inView: heroInView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const { ref: contactRef, inView: contactInView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const { ref: formRef, inView: formInView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const validateForm = (): boolean => {
    const errors: FormErrors = {};

    if (!formData.name.trim()) {
      errors.name = t('contact.error_name_required');
    }

    if (!formData.email.trim()) {
      errors.email = t('contact.error_email_required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = t('contact.error_email_invalid');
    }

    if (!formData.tel.trim()) {
      errors.tel = t('contact.error_tel_required');
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Form submitted:', formData);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', tel: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const visibleContacts = ContactUs.filter(contact => !contact.notShowInContactPage);

  return (
    <div className={styles.contactusSection}>
      <div className={styles.container}>
        {/* Hero Section */}
        <motion.section
          ref={heroRef}
          initial="hidden"
          animate={heroInView ? "visible" : "hidden"}
          variants={containerVariants}
          className={styles.heroSection}
        >
          <motion.div variants={itemVariants} className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              {t('nav.nav_contact_us')}
            </h1>
            <p className={styles.heroDescription}>
              {t('contact.hero_description')}
            </p>
            <div className={styles.heroStats}>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>24</span>
                <span className={styles.statLabel}>{t('contact.hours_support')}</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>50+</span>
                <span className={styles.statLabel}>{t('contact.countries_served')}</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>1000+</span>
                <span className={styles.statLabel}>{t('contact.happy_clients')}</span>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* Contact Methods Section */}
        <motion.section
          ref={contactRef}
          initial="hidden"
          animate={contactInView ? "visible" : "hidden"}
          variants={containerVariants}
          className={styles.contactMethodsSection}
        >
          <motion.div variants={itemVariants} className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{t('contact.contact_methods')}</h2>
            <p className={styles.sectionDescription}>
              {t('contact.choose_preferred_method')}
            </p>
          </motion.div>

          <div className={styles.contactTabs}>
            {visibleContacts.map((contact, index) => (
              <motion.button
                key={contact.label}
                variants={itemVariants}
                onClick={() => setActiveContact(index)}
                className={`${styles.contactTab} ${activeContact === index ? styles.contactTabActive : ''}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <contact.icon />
                <span>{contact.label}</span>
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeContact}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className={styles.contactContent}
            >
              <div className={styles.contactGrid}>
                {visibleContacts[activeContact]?.connects?.map((connect, connectIndex) => (
                  <motion.div
                    key={connectIndex}
                    variants={cardVariants}
                    className={styles.contactCard}
                    whileHover={{ 
                      y: -4, 
                      scale: 1.01,
                      transition: { duration: 0.2, ease: "easeOut" }
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: connectIndex * 0.1 }}
                  >
                    <div className={styles.contactCardHeader}>
                      <div className={styles.contactCardIcon}>
                        {React.createElement(visibleContacts[activeContact].icon)}
                      </div>
                      <div className={styles.contactCardTitle}>
                        {(connect as any).name && (
                          <h4>{(connect as any).name}</h4>
                        )}
                        {connect.value && (
                          <p className={styles.contactValue}>{connect.value}</p>
                        )}
                        {(connect as any).description && (
                          <p className={styles.contactDescription}>{(connect as any).description}</p>
                        )}
                      </div>
                    </div>
                    
                    {(connect as any).qrcode ? (
                      <div className={styles.qrcodeWrapper}>
                        <Image
                          src={(connect as any).qrcode}
                          width={200}
                          height={200}
                          alt={`${visibleContacts[activeContact].label} QR Code`}
                          className={styles.qrcodeImage}
                          priority={true}
                          onError={(e) => {
                            console.error('QR Code image failed to load:', e);
                          }}
                        />
                        <div className={styles.qrcodeLabel}>
                          {t('contact.scan_qr_code')}
                        </div>
                      </div>
                    ) : (
                      <div className={styles.contactInfo}>
                        <div className={styles.contactMethod}>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={styles.contactIcon}>
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <div className={styles.contactText}>
                            <span className={styles.contactLabel}>
                              {visibleContacts[activeContact].label} {t('contact.contact')}
                            </span>
                            <span className={styles.contactValue}>{connect.value}</span>
                          </div>
                        </div>
                        {(connect as any).type === 'phone' && (
                          <div className={styles.phoneNote}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className={styles.infoIcon}>
                              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                              <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <span>{t('contact.click_to_call_or_message')}</span>
                          </div>
                        )}
                      </div>
                    )}
                    
                    <div className={styles.contactCardActions}>
                      <motion.button
                        className={styles.contactButton}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          if (visibleContacts[activeContact].label === 'WhatsApp') {
                            window.open(`https://wa.me/${connect.value.replace(/\+/g, '')}`, '_blank');
                          } else if (visibleContacts[activeContact].label === 'FaceBook') {
                            window.open(`tel:${connect.value}`, '_blank');
                          } else if (visibleContacts[activeContact].label === 'Wechat') {
                            // WeChat QR code is displayed above
                            alert(t('contact.wechat_scan_instruction'));
                          }
                        }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        {t('contact.connect')}
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.section>

        {/* Contact Form Section */}
        <motion.section
          ref={formRef}
          initial="hidden"
          animate={formInView ? "visible" : "hidden"}
          variants={containerVariants}
          className={styles.formSection}
        >
          <motion.div variants={itemVariants} className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{t('contact.send_message')}</h2>
            <p className={styles.sectionDescription}>
              {t('contact.form_description')}
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className={styles.formWrapper}>
            <form onSubmit={handleSubmit} className={styles.contactForm}>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label htmlFor="name" className={styles.formLabel}>
                    {t('contact.name')} *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`${styles.formInput} ${formErrors.name ? styles.formInputError : ''}`}
                    placeholder={t('contact.name_placeholder')}
                  />
                  {formErrors.name && (
                    <span className={styles.errorMessage}>{formErrors.name}</span>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.formLabel}>
                    {t('contact.email')} *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`${styles.formInput} ${formErrors.email ? styles.formInputError : ''}`}
                    placeholder={t('contact.email_placeholder')}
                  />
                  {formErrors.email && (
                    <span className={styles.errorMessage}>{formErrors.email}</span>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="tel" className={styles.formLabel}>
                    {t('contact.tel')} *
                  </label>
                  <input
                    type="tel"
                    id="tel"
                    name="tel"
                    value={formData.tel}
                    onChange={handleInputChange}
                    className={`${styles.formInput} ${formErrors.tel ? styles.formInputError : ''}`}
                    placeholder={t('contact.tel_placeholder')}
                  />
                  {formErrors.tel && (
                    <span className={styles.errorMessage}>{formErrors.tel}</span>
                  )}
                </div>

                <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
                  <label htmlFor="message" className={styles.formLabel}>
                    {t('contact.message')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    className={styles.formTextarea}
                    placeholder={t('contact.message_placeholder')}
                  />
                </div>
              </div>

              <div className={styles.formActions}>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className={`${styles.submitButton} ${isSubmitting ? styles.submitting : ''}`}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <div className={styles.spinner} />
                      {t('contact.sending')}
                    </>
                  ) : (
                    <>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {t('contact.send_message')}
                    </>
                  )}
                </motion.button>
              </div>

              <AnimatePresence>
                {submitStatus !== 'idle' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`${styles.statusMessage} ${
                      submitStatus === 'success' ? styles.statusSuccess : styles.statusError
                    }`}
                  >
                    {submitStatus === 'success' ? (
                      <>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                          <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        {t('contact.success_message')}
                      </>
                    ) : (
                      <>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                          <path d="M12 9V13M12 17H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        {t('contact.error_message')}
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
}

export default Contactus;
