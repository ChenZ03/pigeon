import {Modal, Button, Container, Row, Col, Card} from 'react-bootstrap';
import styles from '../../styles/Workspace.module.css';
import Invites from '../Invites';

function InvitesModal(props) {
  console.log(props.data)
  return (
    <Modal {...props} size="lg" aria-labelledby="invitesModal" centered>
      <Modal.Header closeButton>
        <Modal.Title id="invitesModal">You've been invited to a workspace!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Invites />
        </Container>
      </Modal.Body>
    </Modal>
  );
}

export default InvitesModal;
