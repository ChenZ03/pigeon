import {Modal, Button, Container, Row, Col, Card} from 'react-bootstrap';
import styles from '../../styles/Workspace.module.css';
import Invites from '../Invites';
import {useState, useEffect} from 'react';

function InvitesModal(props) {
  console.log(props.data);

  let showInvites = props.data.map((invite) => (
    <Invites key={invite.id} data={invite} declineinv={props.declineinv} acceptinv={props.acceptinv} />
  ));

  return (
    <Modal {...props} size="lg" aria-labelledby="invitesModal" centered>
      <Modal.Header closeButton>
        <Modal.Title id="invitesModal">You've been invited to a workspace!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          {props.data.length > 0 ? (
            showInvites
          ) : (
            <div className="text-center">
              <h2>Oops! No invitations yet..</h2>
            </div>
          )}
        </Container>
      </Modal.Body>
    </Modal>
  );
}

export default InvitesModal;
