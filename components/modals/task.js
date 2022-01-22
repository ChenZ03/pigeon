import {Modal, Button, Container, Form} from 'react-bootstrap';
import styles from '../../styles/Taskboard.module.css';
import {gql, useMutation, useQuery} from '@apollo/client';
import {useRouter} from 'next/router';
import Swal from 'sweetalert2';
import {useEffect} from 'react';

function TaskModal(props) {
  const router = useRouter();
  const {id} = router.query;

  const onSubmitHandler = (e) => {
    e.preventDefault();
    let workspace = id;
    console.log(workspace);
    const title = document.getElementById('title').value;
    console.log(title);
    const description = document.getElementById('description').value;
    if (title.length < 1) {
      Swal.fire('Error', 'Title / Description should be atleast 1 character', 'error');
      if (description.length < 1) {
        Swal.fire('Error', 'Title / Description should be atleast 1 character', 'error');
      }
    } else {
      addTask({
        variables: {
          title: title,
          description: description,
          workspace: workspace,
          category: 'To do',
        },
      });
    }
  };

  const ADD_TASK = gql`
    mutation addTask($title: String, $description: String, $workspace: String, $category: String) {
      addTask(
        task: {title: $title, description: $description, workspace: $workspace, category: $category, assigns: []}
      ) {
        id
      }
    }
  `;

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

  const [addTask, {error, loading, data}] = useMutation(ADD_TASK, {
    refetchQueries: [{query: GET_ALL_TASKS}],
    onError: () => error,
  });

  useEffect(() => {
    if (error) {
      alert(error);
    }

    if (data) {
      Swal.fire('Task', 'Task created successfully', 'success');
      props.onHide();
    }
  }, [error, data]);

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
