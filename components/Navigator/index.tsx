import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { ProductCategories } from '@constants/index';
import Logo from '@assets/images/logo.png';
import styles from './index.module.css';
import { Languages } from '@/constants/language';
import { rememberLanguage } from '@/utils/languge';

function Navigator() {
  const [productNavShow, setProductNavShow] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const { t } = useTranslation('common');
  const router = useRouter();
  const { pathname = '', asPath = '', locale = 'en' } = router;
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // 监听滚动事件，实现导航栏透明度变化
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleRouteStart = () => setIsLoading(true);
    const handleRouteDone = () => {
      setIsLoading(false);
      setExpanded(false);
      setProductNavShow(false);
    };

    router.events.on('routeChangeStart', handleRouteStart);
    router.events.on('routeChangeComplete', handleRouteDone);
    router.events.on('routeChangeError', handleRouteDone);
    router.events.on('hashChangeComplete', handleRouteDone);

    return () => {
      router.events.off('routeChangeStart', handleRouteStart);
      router.events.off('routeChangeComplete', handleRouteDone);
      router.events.off('routeChangeError', handleRouteDone);
      router.events.off('hashChangeComplete', handleRouteDone);
    };
  }, [router.events]);

  const handleWindowClick = useCallback((e: MouseEvent) => {
    if (!productNavShow || !dropdownRef.current) {
      return;
    }

    const target = e.target as Node | null;
    if (target && dropdownRef.current.contains(target)) {
      return;
    }

    setProductNavShow(false);
  }, [productNavShow]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    window.addEventListener('click', handleWindowClick);
    return () => {
      window.removeEventListener('click', handleWindowClick);
    };
  }, [handleWindowClick]);

  const closeNavigation = () => {
    setProductNavShow(false);
    setExpanded(false);
  };

  const handleLocaleChange = useCallback((currentLocal: string) => {
    if (currentLocal === locale) {
      return;
    }

    rememberLanguage(currentLocal);
    setExpanded(false);
    setProductNavShow(false);
    router.push(asPath, asPath, { locale: currentLocal });
  }, [asPath, locale, router]);

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Navbar 
        className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`} 
        variant="dark" 
        expand="xxl"
        fixed="top"
        expanded={expanded}
      >
        <Container fluid className={styles.navContainer}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Navbar.Brand
              as={Link}
              href="/home"
              className={styles.brand}
              onClick={closeNavigation}
            >
              <div className={styles.logo}>
                <div className={styles.logoWrapper}>
                  <Image src={Logo} width={50} height={50} alt='logo' />
                  <div className={styles.logoGlow}></div>
                </div>
                <div className={styles.logoText}>
                  <div className={styles.companyName}>{t('factory_name')}</div>
                  <div className={styles.tagline}>{t('nav.tagline')}</div>
                </div>
              </div>
            </Navbar.Brand>
          </motion.div>

          <Navbar.Toggle
            label={t('common.toggle_navigation')}
            aria-controls="navbarScroll"
            aria-expanded={expanded}
            className={styles.toggleButton}
            onClick={() => setExpanded((current) => !current)}
          />
          
          <Navbar.Collapse id="navbarScroll">
            <Nav className={`${styles.navLinks} me-auto`}>
              {[
                { href: '/home', label: t('nav.nav_home'), active: pathname === '/' || pathname === '/home' },
                { href: '/product', label: t('nav.nav_products'), active: pathname === '/product' || pathname.includes('/product') },
                { href: '/portfolio', label: t('nav.nav_portfolio'), active: pathname === '/portfolio' },
                { href: '/about', label: t('nav.nav_about_us'), active: pathname === '/about' },
                { href: '/contact', label: t('nav.nav_contact_us'), active: pathname === '/contact' },
              ].map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  <Nav.Link 
                    as={Link}
                    href={item.href}
                    className={`${styles.navLink} ${item.active ? styles.active : ''}`}
                    onClick={closeNavigation}
                  >
                    {item.label}
                    {item.active && <div className={styles.activeIndicator}></div>}
                  </Nav.Link>
                </motion.div>
              ))}

              {/* 产品分类下拉菜单（只保留子分类，不显示“产品分类”主项） */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className={`${styles.productDropdown} ${pathname.includes('/product') ? styles.productDropdownActive : ''}`}
                ref={dropdownRef}
              >
                <NavDropdown 
                  title={<span className={styles.dropdownTriggerLabel}>{t('nav.nav_product_categories')}</span>}
                  id="navbarScrollingDropdown" 
                  show={productNavShow}
                  onToggle={(nextShow) => setProductNavShow(nextShow)}
                  className={styles.dropdownTrigger}
                >
                  <div className={styles.dropdownContent}>
                    {productNavShow && ProductCategories(t).map((item, index) => (
                      <motion.div
                        key={item.label + index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <NavDropdown.Item
                          as={Link}
                          href={item.path}
                          className={styles.dropdownItem}
                          onClick={closeNavigation}
                        >
                          <div className={styles.dropdownItemContent}>
                            <span>{item.label}</span>
                            <div className={styles.dropdownItemHover}></div>
                          </div>
                        </NavDropdown.Item>
                      </motion.div>
                    ))}
                  </div>
                </NavDropdown>
              </motion.div>
            </Nav>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9 }}
              className={styles.languageDropdown}
            >
              <DropdownButton 
                id="dropdown-basic-button" 
                title={
                  <div className={styles.languageButton}>
                    <span>{t('nav.nav_language.language')}</span>
                    {isLoading && <span className={styles.loadingDot} aria-hidden="true"></span>}
                  </div>
                }
                className={styles.dropdownButton}
              >
                {Languages(t).map((item: any, index: any) => (
                  <motion.div
                    key={item.value + index}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Dropdown.Item 
                      onClick={() => handleLocaleChange(item.value)} 
                      className={`${styles.languageItem} ${locale === item.value ? styles.activeLanguage : ''}`}
                      active={locale === item.value}
                    >
                      <span>{item.label}</span>
                      {locale === item.value && <div className={styles.checkMark}>✓</div>}
                    </Dropdown.Item>
                  </motion.div>
                ))}
              </DropdownButton>
            </motion.div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </motion.div>
  );
}

export default Navigator;
