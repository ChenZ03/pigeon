import {useRouter} from 'next/router';
// import MainNav from '../../components/partials/MainNav';
import WorkspaceNav from '../../components/partials/WorkspaceNav';
import {Nav, Navbar, Container, Row, Col, Form, Button} from 'react-bootstrap';
import styles from '../../styles/WorkspaceChat.module.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import {useState} from 'react';
import Router from 'next/router';

function WorkspaceChat() {
  const router = useRouter();
  const {id} = router.query;
  console.log(id)
  const [showDropDown, setShowDropDown] = useState(false);

  return (
    <div className={styles.all}>
      <WorkspaceNav />
      <Row className={styles.row}>
        <div className={styles.navContainer}>
          <Nav defaultActiveKey="/workspace" className={styles.sideNav}>
            <Navbar.Brand className={styles.navBrand}>
              WorkSpace 1
            </Navbar.Brand>
            <div className={styles.navLink} onClick={() => Router.push(`/workspace/taskboard/taskboard`)}>
              <i className={"fas fa-tasks " + styles.icon}></i>
              Task Board
            </div>

            <div className={styles.navLink} href="link-2">
              <i className={"fas fa-caret-down " + styles.icon} onClick={() => {
                  showDropDown === true ? setShowDropDown(false) : setShowDropDown(true);
                }}
              ></i>
              Channels
            </div>
            {showDropDown && (
              <>
                <Nav.Link className={styles.navLink} href="link-1">
                  Channel 1
                </Nav.Link>

                <Nav.Link className={styles.navLink} href="link-2">
                  Channel2
                </Nav.Link>
              </>
            )}
          </Nav>
        </div>
        <div className={styles.chatboxContainer}>
          <div className={styles.relative}>
            <div className={styles.channelName}>
              <h3 className="p-3">#ChannelName</h3>
            </div>
            <div className={styles.msgContainer}>
              <form className={styles.msgBox}>
                <input type="text" placeholder="Write Message..." className={styles.sendMsg} />
                <i class={"far fa-paper-plane " + styles.sendIcon}></i>
              </form>
            </div>
          </div>
        </div>
      </Row>
    </div>
  );
}

export default WorkspaceChat;
