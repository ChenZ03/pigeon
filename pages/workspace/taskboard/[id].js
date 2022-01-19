import {Button, Card, Col, Container, Row} from 'react-bootstrap';
import MainNav from '../../../components/partials/MainNav';
import styles from '../../../styles/Taskboard.module.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Task from '../../../components/Task';
import {useRouter} from 'next/router';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
// idk hwo to slug this yet fangzhe here xian
function Taskboard() {
  const AddNewTask = () => {};
  const router = useRouter();
  const {id} = router.query;
  return (
    <>
      <MainNav />
      {/* chg to taksboard nav */}
      <div className={styles.container}>
        <Container>
          <DragDropContext>
            <h4 className="text-white">Task Board</h4>
            {/* workspace name */}
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
          </DragDropContext>
        </Container>
        <Container className="mt-5">
          <a href={`/workspace/${id}`} className={styles.goBack}>
            <i class="fas fa-backward"></i> Back to workspace
          </a>
        </Container>
      </div>
    </>
  );
}

export default Taskboard;
