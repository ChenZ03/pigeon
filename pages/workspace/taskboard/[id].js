import {Button, Card, Col, Container, Row} from 'react-bootstrap';
import MainNav from '../../../components/partials/MainNav';
import styles from '../../../styles/Taskboard.module.css';
import Task from '../../../components/Task';
import {useRouter} from 'next/router';
// idk hwo to slug this yet fangzhe here xian
function Taskboard() {
  const AddNewTask = () => {};
  const router = useRouter();
  const {id} = router.query;
  console.log(id);

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
              <Card className={styles.outerCard}>
                <Card.Body>
                  <Card.Title>To-Do</Card.Title>
                  {/* Map ba */}
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
                  {/* Map ba */}
                  <Task />
                </Card.Body>
              </Card>
            </Col>
            <Col lg="4">
              <Card className={styles.outerCard}>
                <Card.Body>
                  <Card.Title>Done</Card.Title>
                  {/* Map ba */}
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
