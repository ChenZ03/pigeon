import {Modal, Button, Container, Form, Row, Col} from 'react-bootstrap';
import styles from '../../../styles/Workspace.module.css';

function CenteredModal(props) {
  const onSubmitHandler = () => {};
  const onChangeHandler = () => {};

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
                  <Form.Label>Workspace Name</Form.Label>
                  <Form.Control
                    className={styles.formControl}
                    type="text"
                    placeholder="Workspace Name"
                    name="workspace"
                  />
                </Form.Group>
              </Col>
              <Col lg="2">
                <Button type="submit" className={styles.formButton}>
                  {'>'}
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
