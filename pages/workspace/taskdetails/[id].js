import WorkspaceNav from '../../../components/partials/WorkspaceNav';
import {Button, Card, Col, Container, Nav, Navbar, Row, Form} from 'react-bootstrap';
import styles from '../../../styles/TaskDetails.module.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import {useRouter} from 'next/router';
import Comments from '../../../components/Comments';

function TaskDetails() {
  const router = useRouter();
  const {id} = router.query;
  return (
    <>
      <WorkspaceNav />
      <Row>
        <Col lg="2">
          <Nav defaultActiveKey="/workspace" className={styles.sideNav}>
            <Navbar.Brand className={styles.navBrand}>adad</Navbar.Brand>
            <div className={styles.navLink} onClick={() => Router.push(`/workspace/taskboard/${id}`)}>
              <i className={'fas fa-tasks ' + styles.icon}></i>
              Task Board
            </div>
          </Nav>
        </Col>
        <Col lg="10">
          <Container>
            <div className="py-3">
              <h2>Task details</h2>
              <h4>More details wowowoo</h4>
              <p className="text-end">Created by: CHENZHUNGGG</p>
              <p className="pt-5">Assigned to: jaki pong</p>
            </div>
            <div>
              <Card>
                <Card.Body>
                  <Card.Title>Comments</Card.Title>

                  {/* Map */}
                  <Comments />
                </Card.Body>
                <Card.Footer className="py-3">
                  <Row>
                    <Col lg="10">
                      <Form.Group>
                        <Form.Control type="text" placeholder="Write a comment" />
                      </Form.Group>
                    </Col>
                    <Col lg="2">
                      <Button>Enter</Button>
                    </Col>
                  </Row>
                </Card.Footer>
              </Card>
            </div>
          </Container>
        </Col>
      </Row>
    </>
  );
}

export default TaskDetails;
