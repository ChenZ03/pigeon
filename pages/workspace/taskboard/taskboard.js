import {Button, Card, Col, Container, Row} from 'react-bootstrap';
import MainNav from '../../../components/partials/MainNav';
import styles from '../../../styles/Taskboard.module.css';
import Task from '../../../components/Task';

// idk hwo to slug this yet fangzhe here xian
function Taskboard() {
  const AddNewTask = () => {};
  return (
    <>
      <MainNav />
      {/* chg to taksboard nav */}
      <div className={styles.container}>
        <Container>
          <h4 className="text-white">Workspace 1 - Task Board</h4>
          {/* display as navbar brand */}
          <Row className="mt-3">
            {/* Map ba */}
            <Col lg="4">
              <Card className={styles.outerCard}>
                <Card.Body>
                  <Card.Title>To-Do</Card.Title>
                  <Task />
                  <Container>
                    <Button className={styles.addButton} onClick={() => AddNewTask()}>
                      + Add New Task
                    </Button>
                  </Container>
                </Card.Body>
              </Card>
            </Col>
            <Col lg="4">
              <Card className={styles.outerCard}>
                <Card.Body>
                  <Card.Title>In Progress</Card.Title>
                  <Task />
                </Card.Body>
              </Card>
            </Col>
            <Col lg="4">
              <Card className={styles.outerCard}>
                <Card.Body>
                  <Card.Title>Done</Card.Title>
                  <Task />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
        <Container className="mt-5">
          <a href="/workspace/1" className={styles.goBack}>
            {/*arrow point back wait me find good icons*/} Back to workspace
          </a>
        </Container>
      </div>
    </>
  );
}

export default Taskboard;
