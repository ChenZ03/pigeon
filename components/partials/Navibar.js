import {Navbar, Container, Nav, Badge, Button} from 'react-bootstrap';
import logo from '../images/logo.png';
import Image from 'next/image';
import styles from '../../styles/Navbar.module.css';
import Router from 'next/router';
import {resolveReadonlyArrayThunk} from 'graphql';
import {useState} from 'react';
import InvitesModal from '../modals/invites';

function NaviBar({setLogin, setHome}) {
  const [modalShow, setModalShow] = useState(false);

  return (
    <Navbar collapseOnSelect expand="lg" className={styles.navbarBackground} variant="dark">
      <Container>
        <Navbar.Brand>
          <Image src={logo} alt="#" width={40} height={40} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {/* <Nav className="me-auto">
            <Nav.Link onClick={() => setHome(true)} className={styles.navbrand}>
              pigeon
            </Nav.Link>
          </Nav> */}
          {typeof window !== 'undefined' && localStorage.hasOwnProperty('userData') ? (
            <>
              <Nav className="me-auto">
                <Nav.Link onClick={() => Router.push('/workspace')} className={styles.navbrand}>
                  pigeon
                </Nav.Link>
              </Nav>
              <Nav>
                <Button
                  className={styles.invButton}
                  onClick={() => {
                    setModalShow(true);
                  }}
                >
                  Invites <Badge bg="secondary">0</Badge>
                </Button>

                {/* map de shi zgege ba */}
                <InvitesModal show={modalShow} onHide={() => setModalShow(false)} />

                <Nav.Link
                  className={styles.navtext}
                  onClick={() => {
                    localStorage.removeItem('userData');
                    localStorage.removeItem('token');
                    Router.push('/');
                  }}
                >
                  Logout
                </Nav.Link>
              </Nav>
            </>
          ) : (
            <>
              <Nav className="me-auto">
                <Nav.Link onClick={() => setHome(true)} className={styles.navbrand}>
                  pigeon
                </Nav.Link>
              </Nav>
              <Nav>
                <Nav.Link
                  className={styles.navtext}
                  onClick={() => {
                    setLogin(false);
                    setHome(false);
                  }}
                >
                  Register
                </Nav.Link>
                <Nav.Link
                  className={styles.navtext}
                  onClick={() => {
                    setLogin(true);
                    setHome(false);
                  }}
                >
                  Login
                </Nav.Link>
              </Nav>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NaviBar;
