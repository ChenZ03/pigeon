import {Modal, Button, Container, Form} from 'react-bootstrap';
import styles from '../../styles/Taskboard.module.css';
import {gql, useMutation} from '@apollo/client';

function TaskModal(props) {
  const onSubmitHandler = () => {};

  const ADD_TASK = gql`
    mutation addTask($title: String, $description: String) {
      addTask(task: {title: $title, description: $description}) {
        id
        title
      }
    }
  `;

  const [addTask, {error, loading, data}] = useMutation(ADD_TASK, {
    onError: () => error,
  });
  return (
    <>
      <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Add a task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Form onSubmit={onSubmitHandler} className={styles.width}>
              <Form.Group>
                <Form.Control
                  className={`pt-4 ${styles.formControl}`}
                  type="text"
                  placeholder="Title"
                  name="title"
                  id="title"
                />
                <Form.Control
                  className={`pt-4 ${styles.formControl}`}
                  type="text"
                  placeholder="Description"
                  name="description"
                  id="description"
                />
              </Form.Group>
              <Button type="submit" className={styles.formButton}>
                Add
              </Button>
            </Form>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default TaskModal;
