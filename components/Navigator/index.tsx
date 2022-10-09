import { useCallback, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Image from 'next/image'
import Router, { useRouter } from 'next/router'
import { ProductCategories } from '@constants/index';
import Logo from '@assets/images/logo.svg';
import styles from './index.module.css';

function Navigator() {

  const [productNavShow, setProductNavShow] = useState(false)
  const pathname = useRouter()?.pathname || ''
  
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
            <div className={styles.logoDesc}>XYHardWareFactory</div>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" navbarScroll>
            <Nav.Link href="/" active={pathname === '/'}>Home</Nav.Link>
            <NavDropdown active={pathname === '/product'} title="Products" id="navbarScrollingDropdown" show={productNavShow}
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
            <Nav.Link href="/portfolio" active={pathname === '/portfolio'}>Portfolio</Nav.Link>
            <Nav.Link href="/about" active={pathname === '/about'}>About Us</Nav.Link>
            <Nav.Link href="/contact" active={pathname === '/contact'}>Contact Us</Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="primary" className="btn-round">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigator;
