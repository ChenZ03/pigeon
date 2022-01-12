import {Modal, Button, Container, Row, Col, Card} from 'react-bootstrap';
import styles from '../../styles/Workspace.module.css';
import Invites from '../Invites';

function InvitesModal(props) {
  return (
    <Modal {...props} size="lg" aria-labelledby="invitesModal" centered>
      <Modal.Header closeButton>
        <Modal.Title id="invitesModal">You've been invited to a workspace!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          {/* MAP THIS SHIT */}
          {/* <Row className="mt-2 p-3">
            <Col>
              <div className={`d-flex ${styles.relative}`}>
                <div className={styles.circle}>LI</div>
                <div className={styles.workspaceName}>Lorem Ipsum</div>
                <div className={styles.endButtons}>
                  <div className={`btn ${styles.accept}`}>✔</div>
                  <em> </em>
                  <div className={`btn ${styles.decline}`}>✖</div>
                </div>
              </div>
            </Col>
          </Row> */}
          <Invites />
        </Container>
      </Modal.Body>
    </Modal>
  );
}

export default InvitesModal;
