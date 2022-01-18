import {Navbar, Container} from 'react-bootstrap';
import styles from '../../styles/WorkspaceNav.module.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import logo from '../images/logo.png';
import Image from 'next/image';
import Router from 'next/router';
import {useState, useEffect} from 'react'
import UserModal from '../modals/user'


function WorkspaceNav({id}) {
  const [modalShow, setModalShow] = useState(false);
  const [type, setType] = useState(null)
  return (
    <Navbar className={styles.navbarBackground}>
      <Navbar.Brand className="mx-5" className={styles.logo}>
        <Image src={logo} alt="#" width={50} height={50} onClick={() => Router.push('/workspace')} />
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
          <div className={styles.users}>
            <i className={"fas fa-user-plus " + styles.icon} onClick={() => {
              setModalShow(true)
              setType("invite")
            }} ></i>
            <i className={"fas fa-users " + styles.icon} onClick={() => {
              setModalShow(true)
              setType("users")
            }} ></i>
          </div>
        </Navbar.Text>
      </Navbar.Collapse>
      <UserModal show={modalShow} onHide={() => setModalShow(false)} type={type} id={id}  />
    </Navbar>

  );
}

export default WorkspaceNav;
