import {Navbar, Container} from 'react-bootstrap';
import styles from '../../styles/Navbar.module.css';
import logo from '../images/logo.png';
import Image from 'next/image';

function WorkspaceNav() {
  return (
    <Navbar className={styles.navbarBackground}>
      <Navbar.Brand className="mx-5">
        <Image src={logo} alt="#" width={40} height={40} />
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
          Signed in as: <a href="#login">Mark Otto</a>
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default WorkspaceNav;
