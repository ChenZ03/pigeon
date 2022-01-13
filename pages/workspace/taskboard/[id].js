import {Card, Col, Container, Row} from 'react-bootstrap';
import MainNav from '../../../components/partials/MainNav';
import styles from '../../../styles/Taskboard.module.css';

// idk hwo to slug this yet fangzhe here xian
function Taskboard() {
  return (
    <>
      <MainNav />
      {/* chg to taksboard nav */}
      <div className={styles.container}>
        <Container>
          <h4 className="text-white">Workspace 1 - Task Board</h4>
          {/* display as navbar brand */}
          <Row className="mt-3">
            <Col lg="4">
              <Card>
                <Card.Body>
                  <Card.Title>To-Do</Card.Title>
                </Card.Body>
                <Container>
                  <Card className="my-3">
                    <Card.Body>
                      <Card.Title>Card Title</Card.Title> {/*link*/}
                      <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                      {/* <Card.Link href="#">Card Link</Card.Link>
                      <Card.Link href="#">Another Link</Card.Link> */}
                    </Card.Body>
                  </Card>
                </Container>
              </Card>
            </Col>
            <Col lg="4">
              <Card>
                <Card.Body>
                  <Card.Title>In Progress</Card.Title>
                </Card.Body>
                <Container>
                  <Card className="my-3">
                    <Card.Body>
                      <Card.Title>Card Title</Card.Title> {/*link*/}
                      <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                      {/* <Card.Link href="#">Card Link</Card.Link>
                      <Card.Link href="#">Another Link</Card.Link> */}
                    </Card.Body>
                  </Card>
                </Container>
              </Card>
            </Col>
            <Col lg="4">
              <Card>
                <Card.Body>
                  <Card.Title>Done</Card.Title>
                </Card.Body>
                <Container>
                  <Card className="my-3">
                    <Card.Body>
                      <Card.Title>Card Title</Card.Title> {/*link*/}
                      <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                      {/* <Card.Link href="#">Card Link</Card.Link>
                      <Card.Link href="#">Another Link</Card.Link> */}
                    </Card.Body>
                  </Card>
                </Container>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Taskboard;
