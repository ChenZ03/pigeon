import {Card, Col, Container} from 'react-bootstrap';
import styles from '../styles/Taskboard.module.css';
import Router from 'next/router';

function Task({data}) {
  return (
    <Container>
      <Card className={`my-3 ${styles.taskCard}`} onClick={() => Router.push(`/workspace/taskdetails/${data.id}`)}>
        <Card.Body>
          <Card.Title>{data.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{data.description}</Card.Subtitle>
        </Card.Body>
        {/* if assigned then show footer else nah, if more than 2 then show the 2+ gua idk */}
        <Card.Footer className={`text-end ${styles.cardFooter} `}>
          {' '}
          <p className={styles.circle}>LI</p>{' '}
        </Card.Footer>
      </Card>
    </Container>
  );
}

export default Task;
