import { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Image from 'next/image';
import Router, { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { ProductCategories, UrlPrefix } from '@constants/index';
import Logo from '@assets/images/logo.png';
import styles from './index.module.css';
import { Languages } from '@/constants/language';

function Navigator() {
  const [productNavShow, setProductNavShow] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation('common');
  const router: any = useRouter();
  const { pathname = '', asPath = '', locale = 'en' } = router;

  // 监听滚动事件，实现导航栏透明度变化
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleWindowClick = useCallback((e: any) => {
    const target = e.target;
    const classList = target?.classList;
    if (!productNavShow) return;
    if (productNavShow && classList?.[0] === 'dropdown-toggle') {
      setProductNavShow(false);
      return;
    }
    if (classList?.[0] === 'dropdown-toggle' || classList?.[0] === 'dropdown-item') {
      return;
    }
    setProductNavShow(false);
  }, [productNavShow]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener('click', handleWindowClick);
      return () => {
        window.removeEventListener('click', handleWindowClick);
      };
    }
  }, [handleWindowClick]);

  const handleProductClick = useCallback((e: any) => {
    e.stopPropagation();
    setProductNavShow(!productNavShow);
  }, [productNavShow]);

  const handleDropDownItemClick = useCallback((pathname: string) => {
    setIsLoading(true);
    Router.push(pathname || "home");
    setProductNavShow(false);
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const handleLocaleChange = useCallback((currentLocal: string) => {
    setIsLoading(true);
    localStorage.setItem('language', currentLocal);
    let { asPath, locale } = router;
    asPath = asPath.replace('/', '');
    router.push(`/${locale}/${asPath}`, asPath, { locale: currentLocal });
    setTimeout(() => setIsLoading(false), 1000);
  }, [router]);

  const handleNavClick = useCallback((href: string) => {
    setIsLoading(true);
    Router.push(href);
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Navbar 
        className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`} 
        variant="dark" 
        expand="lg"
        fixed="top"
      >
        <Container fluid className={styles.navContainer}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Navbar.Brand 
              href={`${UrlPrefix}home`} 
              className={styles.brand}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(`${UrlPrefix}home`);
              }}
            >
              <div className={styles.logo}>
                <div className={styles.logoWrapper}>
                  <Image src={Logo} width={50} height={50} alt='logo' />
                  <div className={styles.logoGlow}></div>
                </div>
                <div className={styles.logoText}>
                  <div className={styles.companyName}>{t('factory_name')}</div>
                  <div className={styles.tagline}>Premium Hardware</div>
                </div>
              </div>
            </Navbar.Brand>
          </motion.div>

          <Navbar.Toggle aria-controls="navbarScroll" className={styles.toggleButton} />
          
          <Navbar.Collapse id="navbarScroll">
            <Nav className={`${styles.navLinks} me-auto`}>
              {[
                { href: `${UrlPrefix}home`, label: t('nav.nav_home'), active: pathname === '/' || pathname === '/home' },
                { href: `${UrlPrefix}product`, label: t('nav.nav_products'), active: pathname === '/product' || pathname.includes('/product') },
                { href: `${UrlPrefix}portfolio`, label: t('nav.nav_portfolio'), active: pathname === '/portfolio' },
                { href: `${UrlPrefix}about`, label: t('nav.nav_about_us'), active: pathname === '/about' },
                { href: `${UrlPrefix}contact`, label: t('nav.nav_contact_us'), active: pathname === '/contact' },
              ].map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  <Nav.Link 
                    href={item.href}
                    className={`${styles.navLink} ${item.active ? styles.active : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
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
                className={styles.productDropdown}
              >
                <NavDropdown 
                  title={null} // 不显示主项标题
                  id="navbarScrollingDropdown" 
                  show={productNavShow}
                  onClick={handleProductClick}
                  className={styles.navLink}
                >
                  <div className={styles.dropdownContent}>
                    <AnimatePresence>
                      {productNavShow && ProductCategories(t).map((item, index) => (
                        <motion.div
                          key={item.label + index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <NavDropdown.Item 
                            className={styles.dropdownItem}
                            onClick={() => handleDropDownItemClick(item.path)}
                          >
                            <div className={styles.dropdownItemContent}>
                              <span>{item.label}</span>
                              <div className={styles.dropdownItemHover}></div>
                            </div>
                          </NavDropdown.Item>
                        </motion.div>
                      ))}
                    </AnimatePresence>
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
                    {isLoading && <div className="loading-spinner"></div>}
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
