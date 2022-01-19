import {Navbar, Container, Nav} from 'react-bootstrap';
import styles from '../../styles/Navbar.module.css';
import logo from '../images/logo.png';
import Image from 'next/image';

function WorkspaceNav() {
  return (
    <Navbar className={styles.navbarBackground}>
      <Navbar.Brand className="mx-5">
        <Image src={logo} alt="#" width={40} height={40} />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto"></Nav>
        <Nav>
          <Nav.Link href="#deets">Inv user icon</Nav.Link>
          <Nav.Link eventKey={2} href="#memes">
            View users icon
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default WorkspaceNav;
