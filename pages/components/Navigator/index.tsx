import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
// import Image from 'react-bootstrap/Image';
import Image from 'next/image'
import Logo from '../../../assets/images/logo.png';
import styles from './index.module.css';

function Navigator() {
  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/">
          <div className={styles.logo}>
            <Image src={Logo} width={100} height={100} />
            XYHardWareFactory
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" navbarScroll>
            <Nav.Link href="/">Home</Nav.Link>
            {/* <Nav.Link href="#action2">Products</Nav.Link> */}
            <NavDropdown title="Products" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Shower Hinge</NavDropdown.Item>
              <NavDropdown.Item href="#action4">Glass Hinge</NavDropdown.Item>
              {/* <NavDropdown.Divider /> */}
              {/* <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item> */}
            </NavDropdown>
            <Nav.Link href="/about">About Us</Nav.Link>
            <Nav.Link href="/contact">Contact Us</Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="primary">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigator;
