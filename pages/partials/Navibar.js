import {Navbar, Container, Nav, Badge} from 'react-bootstrap';
import logo from '../components/images/logo.png';
import Image from 'next/image';
import styles from '../../styles/Navbar.module.css';

function NaviBar() {
  return (
    <Navbar collapseOnSelect expand="lg" className={styles.navbarBackground} variant="dark">
      <Container>
        <Navbar.Brand href="/">
          <Image src={logo} alt="#" width={40} height={40} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/" className={styles.navbrand}>
              pigeon
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="/login" className={styles.navtext}>
              Invites <Badge bg="secondary">0</Badge>
            </Nav.Link>
            <Nav.Link href="/register" className={styles.navtext}>
              Logout
            </Nav.Link>
            {/* <Nav.Link href="/register" className={styles.navtext}>
              Register
            </Nav.Link>
            <Nav.Link href="/login" className={styles.navtext}>
              Login
            </Nav.Link> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NaviBar;
