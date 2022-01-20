import {Button, Card, Col, Container, Row} from 'react-bootstrap';
import MainNav from '../../../components/partials/MainNav';
import styles from '../../../styles/Taskboard.module.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Task from '../../../components/Task';
import {useRouter} from 'next/router';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import {useQuery} from '@apollo/client';
import {useEffect, useState} from 'react';
import {gql} from '@apollo/client';
// idk hwo to slug this yet fangzhe here xian
function Taskboard() {
  const AddNewTask = () => {};
  const router = useRouter();
  const {id} = router.query;
  const [allTasks, setAllTasks] = useState([]);
  const [todos, setTodos] = useState(null);
  const [inProgress, setInProgress] = useState(null);
  const [done, setDone] = useState(null);

  const onDragEnd = (result) => {
    const {source, destination, draggableId} = result;

    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    const id = draggableId;
    const start = source.droppableId;
    const end = destination.droppableId;
  };
  const GET_ALL_TASKS = gql`
    query getTask($id: String) {
      getTask(id: $id) {
        id
        title
        description
        category
        assigns {
          id
          username
        }
      }
    }
  `;

  const getAllTasks = useQuery(GET_ALL_TASKS, {
    variables: {
      id: id,
    },
  });

  useEffect(() => {
    if (getAllTasks.data) {
      setAllTasks(getAllTasks.data.getTask);
    }
  }, [getAllTasks]);

  useEffect(() => {
    if (getAllTasks.data) {
      let arr1 = [];
      let arr2 = [];
      let arr3 = [];

      for (let i = 0; i < allTasks.length; i++) {
        if (allTasks[i].category === 'To do') {
          arr1.push(allTasks[i]);
        } else if (allTasks[i].category === 'in progress') {
          arr2.push(allTasks[i]);
        } else if (allTasks[i].category === 'done') {
          arr3.push(allTasks[i]);
        }
      }

      setTodos(arr1);
      setInProgress(arr2);
      setDone(arr3);
    }
  }, [allTasks]);

  return (
    <>
      <MainNav />
      {/* chg to taksboard nav */}
      <div className={styles.container}>
        <Container>
          <DragDropContext onDragEnd={onDragEnd}>
            <h4 className="text-white">Task Board</h4>
            {/* workspace name */}
            {/* display as navbar brand */}
            <Row className="mt-3">
              <Col lg="4">
                <Droppable droppableId="0">
                  {(provided, snapshot) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      <Card className={styles.outerCard}>
                        <Card.Body>
                          <Card.Title>To-Do</Card.Title>
                          {todos ? (
                            todos.map((todo, index) => (
                              <Draggable key={todo._id} draggableId={todo.id} index={index}>
                                {(provided, snapshot) => (
                                  <div
                                    ref={provided.innerRef}
                                    key={todo._id}
                                    index={index}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  >
                                    <Task
                                      key={todo._id}
                                      index={index}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      data={todo}
                                    />
                                  </div>
                                )}
                              </Draggable>
                            ))
                          ) : (
                            <Container>
                              <Card className={`my-3 ${styles.taskCard}`}>
                                <Card.Body>
                                  <Card.Title>No tasks yet</Card.Title>
                                </Card.Body>
                              </Card>
                            </Container>
                          )}
                          {provided.placeholder}
                          <Container>
                            <Button className={styles.addButton} onClick={() => AddNewTask()}>
                              + Add New Task
                            </Button>
                          </Container>
                        </Card.Body>
                      </Card>
                    </div>
                  )}
                  {/* Map ba */}
                </Droppable>
              </Col>

              <Col lg="4">
                <Droppable droppableId="1">
                  {(provided, snapshot) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      <Card className={styles.outerCard}>
                        <Card.Body>
                          <Card.Title>In Progress</Card.Title>

                          {inProgress ? (
                            inProgress.map((doing, index) => (
                              <Draggable key={doing._id} draggableId={doing.id} index={index}>
                                {(provided, snapshot) => (
                                  <div
                                    ref={provided.innerRef}
                                    key={doing._id}
                                    index={index}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  >
                                    <Task
                                      key={doing._id}
                                      index={index}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      data={doing}
                                    />
                                  </div>
                                )}
                              </Draggable>
                            ))
                          ) : (
                            <Container>
                              <Card className={`my-3 ${styles.taskCard}`}>
                                <Card.Body>
                                  <Card.Title>No tasks yet</Card.Title>
                                </Card.Body>
                              </Card>
                            </Container>
                          )}
                        </Card.Body>
                        {provided.placeholder}
                      </Card>
                    </div>
                  )}
                </Droppable>
              </Col>

              <Col lg="4">
                <Droppable droppableId="2">
                  {(provided, snapshot) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      <Card className={styles.outerCard}>
                        <Card.Body>
                          <Card.Title>Done</Card.Title>

                          {done ? (
                            done.map((done, index) => (
                              <Draggable key={done._id} draggableId={done.id} index={index}>
                                {(provided, snapshot) => (
                                  <div
                                    ref={provided.innerRef}
                                    key={done._id}
                                    index={index}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  >
                                    <Task
                                      key={done._id}
                                      index={index}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      data={done}
                                    />
                                  </div>
                                )}
                              </Draggable>
                            ))
                          ) : (
                            <Container>
                              <Card className={`my-3 ${styles.taskCard}`}>
                                <Card.Body>
                                  <Card.Title>No tasks yet</Card.Title>
                                </Card.Body>
                              </Card>
                            </Container>
                          )}
                        </Card.Body>
                        {provided.placeholder}
                      </Card>
                    </div>
                  )}
                  {/* Map ba */}
                </Droppable>
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
