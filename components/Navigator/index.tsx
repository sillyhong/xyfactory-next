import { useCallback, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Image from 'next/image'
import Router, { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { ProductCategories } from '@constants/index';
import Logo from '@assets/images/logo.png';
import styles from './index.module.css';
import { Languages } from '@/constants/language';
import Link from 'next/link';


function Navigator() {

  const [productNavShow, setProductNavShow] = useState(false)
  const { t } = useTranslation('common')
  const router: any = useRouter()
  const { pathname = '', asPath = '', locale = 'en', locales = [] } = router

  const handleWindowClick = useCallback((e: any) => {
    const target = e.target
    const classList = target?.classList
    if (!productNavShow) return
    if (productNavShow && classList?.[0] === 'dropdown-toggle') {
      setProductNavShow(false)
      return
    }
    if (classList?.[0] === 'dropdown-toggle' || classList?.[0] === 'dropdown-item') {
      return
    }
    setProductNavShow(false)
  }, [productNavShow])

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener('click', handleWindowClick)
      return () => {
        window.removeEventListener('click', handleWindowClick)
      }
    }
  }, [handleWindowClick])

  const handleProductClick = useCallback((e: any) => {
    e.stopPropagation()
    setProductNavShow(!productNavShow)

  }, [productNavShow])


  const handleDropDownItemClick = useCallback((pathname: string) => {
    Router.push(pathname || "home")
    setProductNavShow(false)
  }, [])

  const handleLocaleChange = useCallback((currentLocal: string) => {
    localStorage.setItem('language',currentLocal)

    const { asPath, locale, pathname } = router
    router.push(`/${locale}/${asPath}`, asPath, { locale: currentLocal })
  }, [router])

  return (
    <Navbar className={styles.fixed} bg="primary" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand href="home">
          <div className={`${styles.logo} hvr-grow`}>
            <Image src={Logo} width={80} height={80} alt='logo' />
            <div className={`${styles.logoDesc}`}>{t('factory_name')}</div>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" navbarScroll>
            <Nav.Link href={'home'}  className='hvr-underline-from-left' active={pathname === '/' || pathname === '/home'}>{t('nav.nav_home')}</Nav.Link>
            <NavDropdown active={pathname.includes('/product')} title={t('nav.nav_products')} id="navbarScrollingDropdown" show={productNavShow}
              // onMouseOver={handleProductMouseOver} onMouseOut={handleProductMouseOut} onClick={handleProductClick}
              onClick={handleProductClick}
            >
              {
                ProductCategories(t).map((item, index) => {
                  return (
                    <NavDropdown.Item key={item.label + index} className='hvr-underline-from-left' onClick={() => { handleDropDownItemClick(item.path) }}>
                      <div >
                        {item.label}
                      </div>
                    </NavDropdown.Item>
                  )
                })
              }
            </NavDropdown>
            <Nav.Link href="portfolio" className='hvr-underline-from-left' active={pathname === '/portfolio'}>{t('nav.nav_portfolio')}</Nav.Link>
            <Nav.Link href="about" className='hvr-underline-from-left' active={pathname === '/about'}>{t('nav.nav_about_us')}</Nav.Link>
            <Nav.Link href="contact" className='hvr-underline-from-left' active={pathname === '/contact'}>{t('nav.nav_contact_us')}</Nav.Link>

            {/* <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder={t('nav.nav_search')}
                className="me-2"
                aria-label="Search"
              />
              <Button variant="primary" className="btn-round">{t('nav.nav_search')}</Button>
            </Form> */}
          </Nav>

          <DropdownButton id="dropdown-basic-button" style={{marginLeft: '-10px'}} title={t('nav.nav_language.language')}>
            {
              Languages(t).map((item: any, index: any) => {
                return (
                  <Dropdown.Item onClick={()=>{handleLocaleChange(item.value)}} className={`${styles.dropdownLink} hvr-underline-from-left`} active={locale === item.value} key={item.value + index}>
                    {item.label}
                    {/* <Link  onClick={(e)=>{e.stopPropagation()}} locale={item.value} href={asPath}>{item.label}</Link> */}
                  </Dropdown.Item>
                )
              })
            }
          </DropdownButton>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigator;
