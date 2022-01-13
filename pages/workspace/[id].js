import {useRouter} from 'next/router';
// import MainNav from '../../components/partials/MainNav';
import WorkspaceNav from '../../components/partials/WorkspaceNav';
import {Nav, Navbar, Container, Row, Col, Form, Button} from 'react-bootstrap';
import styles from '../../styles/WorkspaceChat.module.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useState} from 'react';

function WorkspaceChat() {
  const router = useRouter();
  const {id} = router.query;
  const [showDropDown, setShowDropDown] = useState(false);

  return (
    <>
      <WorkspaceNav />
      <Row>
        <Col lg="2">
          <Nav defaultActiveKey="/workspace" className={styles.sideNav}>
            <Navbar.Brand className={styles.navBrand} href="/workspace">
              Active
            </Navbar.Brand>
            <Nav.Link className={styles.navLink} href={`/workspace/taskboard/taskboard`}>
              Task Board
            </Nav.Link>

            <Navbar.Text className={styles.navLink} href="link-2">
              <button
                onClick={() => {
                  showDropDown === true ? setShowDropDown(false) : setShowDropDown(true);
                }}
              >
                V
              </button>
              Channels
            </Navbar.Text>
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
        </Col>
        <Col lg="10">
          <div className={styles.relative}>
            <h3 className="p-3">#ChannelName</h3>
            <Form className={styles.msgContainer}>
              <Form.Group className={styles.msgBox}>
                <Form.Control as="textarea" type="text" placeholder="Send Message..." className={styles.sendMsg} />
              </Form.Group>
              <Button className={styles.sendButton} type="submit">
                Submit
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </>
  );
}

export default WorkspaceChat;
