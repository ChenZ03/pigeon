import {Button, Card, Col, Container, Row} from 'react-bootstrap';
import MainNav from '../../../components/partials/MainNav';
import styles from '../../../styles/Taskboard.module.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Task from '../../../components/Task';
import {useRouter} from 'next/router';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import {useQuery, gql, useMutation} from '@apollo/client';
import {useEffect, useState} from 'react';
import TaskModal from '../../../components/modals/task';

function Taskboard() {
  const router = useRouter();
  const {id} = router.query;
  const [allTasks, setAllTasks] = useState([]);
  const [todos, setTodos] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [done, setDone] = useState([]);
  const [modalShow, setModalShow] = useState(false);

  const UPDATE_TASK = gql`
    mutation changeTaskCat($id: ID, $category: String) {
      changeTaskCat(task: {id: $id, category: $category}) {
        id
        title
        description
        assigns {
          id
          username
        }
      }
    }
  `;

  const [update, updateData] = useMutation(UPDATE_TASK, {
    onError: () => updateData.error,
  });

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

    if (start !== end) {
      if (end === '0') {
        update({
          variables: {
            id: id,
            category: 'To do',
          },
        }).then();
        getAllTasks.refetch();
      } else if (end === '1') {
        update({
          variables: {
            id: id,
            category: 'in progress',
          },
        }).then();
        getAllTasks.refetch();
      } else if (end === '2') {
        update({
          variables: {
            id: id,
            category: 'done',
          },
        }).then();
        getAllTasks.refetch();
      }
    }
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

  useEffect(() => {
    if (updateData.data) {
      getAllTasks.refetch();
    }
  }, [updateData]);

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
                          {todos.length !== 0 ? (
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
                            <Button className={styles.addButton} onClick={() => setModalShow(true)}>
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

              <TaskModal show={modalShow} onHide={() => setModalShow(false)} />

              <Col lg="4">
                <Droppable droppableId="1">
                  {(provided, snapshot) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      <Card className={styles.outerCard}>
                        <Card.Body>
                          <Card.Title>In Progress</Card.Title>

                          {inProgress.length !== 0 ? (
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

                          {done.length !== 0 ? (
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
