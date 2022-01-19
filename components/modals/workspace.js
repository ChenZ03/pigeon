import {Modal, Button, Container, Form, Row, Col} from 'react-bootstrap';
import styles from '../../styles/Workspace.module.css';
import {gql, useMutation} from '@apollo/client';
import {useEffect} from 'react';

function CenteredModal(props) {
  const onSubmitHandler = (e) => {
    e.preventDefault();
    let workspace = document.getElementById('workspace').value;
    let userId = JSON.parse(localStorage.getItem('userData')).user.id;
    if (workspace.length < 1) {
      alert('Workspace name must be at least one character');
    } else {
      createWorkspace({
        variables: {
          name: workspace,
          user: userId,
        },
      });
    }
  };

  const CREATEWORKSPACE = gql`
    mutation CreateWorkspace($name: String!, $user: String!) {
      createWorkspace(workspace: {name: $name, user: $user}) {
        id
        name
        owner
      }
    }
  `;

  const [createWorkspace, {error, loading, data}] = useMutation(CREATEWORKSPACE, {
    onError: () => error,
  });

  useEffect(() => {
    if (error) {
      alert(error);
    }

    if (data) {
      alert('Workspace created successfully');
      props.onHide();
      props.fetch();
    }
  }, [error, data]);

  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Name your workspace!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Form onSubmit={onSubmitHandler} className={styles.width}>
            <Row>
              <Col lg="10">
                <Form.Group>
                  <Form.Control
                    className={`pt-4 ${styles.formControl}`}
                    type="text"
                    placeholder="Workspace Name"
                    name="workspace"
                    id="workspace"
                  />
                </Form.Group>
              </Col>
              <Col lg="2">
                <Button type="submit" className={styles.formButton}>
                  Create
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </Modal.Body>
    </Modal>
  );
}

export default CenteredModal;
