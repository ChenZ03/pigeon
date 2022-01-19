import {Navbar, Container, Nav, Badge, Button} from 'react-bootstrap';
import logo from '../images/logo.png';
import Image from 'next/image';
import styles from '../../styles/Navbar.module.css';
import Router from 'next/router';
import {useState, useEffect} from 'react';
import InvitesModal from '../modals/invites';
import {gql, useQuery, useSubscription} from '@apollo/client';
import Swal from 'sweetalert2'

function MainNav({setLogin, setHome, invitation}) {
  const [modalShow, setModalShow] = useState(false);
  const [inv, setInv] = useState([]);

  const GET_INVITATION = gql`
    query getPending($id: String!) {
      getPending(id: $id) {
        id
        name
      }
    }
  `;

  const INVITED = gql`
    subscription userInvited($user_id : String!){
      userInvited(user_id: $user_id){
        pending
      }
    }
  `

  if (typeof window !== 'undefined' && localStorage.hasOwnProperty('userData')) {
    var {loading, error, data, refetch} = useQuery(GET_INVITATION, {
      variables: {
        id: JSON.parse(localStorage.getItem('userData')).user.id,
      },
    });

    var invitedData = useSubscription(INVITED,{
      variables: {
        user_id: JSON.parse(localStorage.getItem('userData')).user.id,
      }
    })
  }

  useEffect(() => {
    if (data) {
      setInv(data.getPending);
    }
  }, [data])

  const acceptInvHandler = () => {
    refetch()
    invitation()
  }

  const declineInvHandler = () => {
    refetch()
  }

  useEffect(() => {
    if(typeof window !== 'undefined' && localStorage.hasOwnProperty('userData') && invitedData.data && !invitedData.loading){
      refetch()
    }
  }, [invitedData])

  return (
    <Navbar collapseOnSelect expand="lg" className={styles.navbarBackground} variant="dark">
      <Container>
        <Navbar.Brand>
          <Image src={logo} alt="#" width={40} height={40} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
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
                  Invites ({`${inv.length}`}){/* <Badge bg="secondary"> */}
                </Button>

                <InvitesModal show={modalShow} onHide={() => setModalShow(false)} data={inv} acceptinv={acceptInvHandler} declineinv={declineInvHandler} />

                <Nav.Link
                  className={styles.navtext}
                  onClick={() => {
                    Swal.fire({
                      title: 'Are you sure to logout?',
                      text: "You won't be able to revert this!",
                      icon: 'warning',
                      showCancelButton: true,
                      confirmButtonColor: '#3085d6',
                      cancelButtonColor: '#d33',
                      confirmButtonText: 'Yes'
                    }).then((result) => {
                      if (result.isConfirmed) {
                        Swal.fire(
                          'Logout',
                          'Logout Successfully',
                          'success'
                        )
                        localStorage.removeItem('userData');
                        localStorage.removeItem('token');
                        Router.push('/');
                      }
                    })
                   
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

export default MainNav;
