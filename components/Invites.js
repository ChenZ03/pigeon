import styles from '../styles/Workspace.module.css';
import {Row, Col, Button} from 'react-bootstrap';

function Invites() {
  return (
    <Row className="mt-2 p-3">
      <Col>
        <div className={`d-flex ${styles.relative}`}>
          <div className={styles.circle}>LI</div>
          <div className={styles.workspaceName}>Lorem Ipsum</div>
          <div className={styles.endButtons}>
            <Button type="submit" className={styles.accept}>
              ✔
            </Button>
            <em> </em>
            <Button type="submit" className={styles.decline}>
              ✖
            </Button>
          </div>
        </div>
      </Col>
    </Row>
  );
}

export default Invites;
