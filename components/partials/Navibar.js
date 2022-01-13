import {Navbar, Container, Nav, Badge} from 'react-bootstrap';
import logo from '../images/logo.png';
import Image from 'next/image';
import styles from '../../styles/Navbar.module.css';
import Router from 'next/router';
import {useState, useEffect} from 'react';
import InvitesModal from '../modals/invites';
import {
  gql,
  useQuery,
} from '@apollo/client'

function NaviBar({setLogin, setHome, invitation}) {
  const [modalShow, setModalShow] = useState(false);
  const [inv, setInv] = useState([])

  const GET_INVITATION = gql`
    query getPending($id : String!){
      getPending(id : $id){
        id
        name
      }
    }
  `

  if(typeof window !== 'undefined' && localStorage.hasOwnProperty('userData')){
    var {loading, error, data, refetch} = useQuery(GET_INVITATION, {
      variables : {
        id : JSON.parse(localStorage.getItem('userData')).user.id
      }
    })
  }

  useEffect(() => {
    if(data) {
      setInv(data.getPending)
    }
  }, [data])



  return (
    <Navbar collapseOnSelect expand="lg" className={styles.navbarBackground} variant="dark">
      <Container>
        <Navbar.Brand>
          <Image src={logo} alt="#" width={40} height={40} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => setHome(true)} className={styles.navbrand}>
              pigeon
            </Nav.Link>
          </Nav>
          {typeof window !== 'undefined' && localStorage.hasOwnProperty('userData') ? (
            <Nav>
              <Nav.Link
                href="/workspace"
                className={styles.navtext}
                onClick={() => {
                  setModalShow(true);
                }}
              >
                Invites <Badge bg="secondary">{inv.length}</Badge>
              </Nav.Link>

              <InvitesModal show={modalShow} onHide={() => setModalShow(false)} data={inv} />

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
          ) : (
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
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NaviBar;
