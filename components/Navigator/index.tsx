import { useCallback, useState } from 'react';
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
import Logo from '@assets/images/logo.svg';
import styles from './index.module.css';
import { Languages } from '@/constants/language';
import Link from 'next/link';


function Navigator() {

  const [productNavShow, setProductNavShow] = useState(false)
  const { t } = useTranslation('common')
  const router: any = useRouter()
  const { pathname = '', asPath = '', locale = 'en', locales = [] } = router

  
  const handleProductMouseOver = useCallback(()=>{
    setProductNavShow(true)

  }, [])

  const handleProductMouseOut = useCallback(()=>{
    setProductNavShow(false)

  }, [])
  
  const handleProductClick = useCallback((e: any)=>{
    e.preventDefault();
    const target  = e.target
      const classList = target.classList
      if(classList?.length) {
        Router.push('/product')
      }
    setProductNavShow(!productNavShow)
    return false
  }, [productNavShow])

  const handleDropDownItemClick = useCallback((pathname: string)=>{
    Router.push(pathname || "/")
  }, [])

  return (
    <Navbar className={styles.fixed} bg="primary" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/">
          <div className={styles.logo}>
            <Image src={Logo} width={60} height={60} alt='logo' />
            <div className={styles.logoDesc}>{t('factory_name')}</div>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" navbarScroll>
            <Nav.Link href="/" active={pathname === '/'}>{t('nav.nav_home')}</Nav.Link>
            <NavDropdown active={pathname === '/product'} title={t('nav.nav_products')} id="navbarScrollingDropdown" show={productNavShow}
              onMouseOver={handleProductMouseOver} onMouseOut={handleProductMouseOut} onClick={handleProductClick}
              >
              {
                ProductCategories.map((item, index) => {
                  return (
                    <NavDropdown.Item key={item.label + index} className={styles.NavDropdown} >
                      <div onClick={() => {handleDropDownItemClick(item.path)}}>
                        {item.label}
                      </div>
                    </NavDropdown.Item>
                  )
                })
              }
            </NavDropdown>
            <Nav.Link href="/portfolio" active={pathname === '/portfolio'}>{t('nav.nav_portfolio')}</Nav.Link>
            <Nav.Link href="/about" active={pathname === '/about'}>{t('nav.nav_about_us')}</Nav.Link>
            <Nav.Link href="/contact" active={pathname === '/contact'}>{t('nav.nav_contact_us')}</Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder={t('nav.nav_search')}
              className="me-2"
              aria-label="Search"
            />
            <Button variant="primary" className="btn-round">{t('nav.nav_search')}</Button>
          </Form>

        <DropdownButton id="dropdown-basic-button" title={t('nav.nav_language.language')}>
          {
            Languages(t).map((item, index)=>{
              return  (
                // <Dropdown.Item locale={item.value} onclick={()=>{handleLanguageClick(item.prefix)}} active={locale === item.value} key={item.value}>{item.label}</Dropdown.Item>
                <Dropdown.Item className={styles.dropdownLink} active={locale === item.value} key={item.value + index}>
                  <Link  locale={item.value} href={asPath}>{item.label}</Link>
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
