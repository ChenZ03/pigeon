import Router from 'next/router';
import {Card, Container, Row, Col} from 'react-bootstrap';
import styles from '../styles/Workspace.module.css';

function Workspace({data}) {
  let {id, name} = data;
  let shortName = '';

  if (name.split(' ').length > 1) {
    let name1 = name.split(' ').shift()[0].toUpperCase();
    let name2 = name.split(' ').pop()[0].toUpperCase();
    shortName = name1 + name2;
  } else {
    shortName = name[0].toUpperCase();
  }

  const onClickHandler = (e) => {
    Router.push(`/workspace/${id}`);
  };

  return (
    <>
      <Container>
        <Row>
          <Col>
            <Card className={styles.workspaceCard}>
              <Card.Body>
                <div className={`d-flex ${styles.relative}`}>
                  <div className={styles.circle}>{shortName}</div>
                  <div className={styles.workspaceName}>{name}</div>
                  <div className={`btn ${styles.launchButton}`} onClick={onClickHandler}>
                    Launch Workspace
                  </div>
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
