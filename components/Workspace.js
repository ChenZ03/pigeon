import {Card, Container, Row, Col} from 'react-bootstrap';
import styles from '../styles/Workspace.module.css';

function Workspace() {
  return (
    <>
      <Container>
        {/* MAP THIS SHIT */}
        <Row>
          <Col>
            <Card className={styles.workspaceCard}>
              <Card.Body>
                <div className={`d-flex ${styles.relative}`}>
                  <div className={styles.circle}>LI</div>
                  <div className={styles.workspaceName}>Lorem Ipsum</div>
                  <a href={`/1`} className={`btn ${styles.launchButton} ${styles.link}`}>Launch Workspace</a>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Workspace;
