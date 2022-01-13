import {Card, Col, Container} from 'react-bootstrap';
import styles from '../styles/Taskboard.module.css';

function Task() {
  return (
    <Container>
      <Card className={`my-3 ${styles.taskCard}`}>
        <Card.Body>
          <Card.Title>Card Title</Card.Title> {/*link*/}
          <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
          {/* <Card.Link href="#">Card Link</Card.Link>
                <Card.Link href="#">Another Link</Card.Link> */}
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
