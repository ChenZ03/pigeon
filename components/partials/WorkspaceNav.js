import {Navbar, Container} from 'react-bootstrap';
import styles from '../../styles/WorkspaceNav.module.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import logo from '../images/logo.png';
import Image from 'next/image';
import Router from 'next/router';

function WorkspaceNav() {
  return (
    <Navbar className={styles.navbarBackground}>
      <Navbar.Brand className="mx-5" className={styles.logo}>
        <Image src={logo} alt="#" width={50} height={50} onClick={() => Router.push('/workspace')} />
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
          <div className={styles.users}>
            <i className={"fas fa-user-plus " + styles.icon} ></i>
            <i className={"fas fa-users " + styles.icon}></i>
          </div>
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default WorkspaceNav;
