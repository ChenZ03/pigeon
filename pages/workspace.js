import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Workspace.module.css';
import NaviBar from '../components/partials/Navibar';
import {Container, Row, Col, Button, Card} from 'react-bootstrap';
import CenteredModal from '../components/modals/workspace';
import img from '../components/images/workspace.png';
import {useState} from 'react';
import Router from 'next/router';
import Workspace from '../components/Workspace';

export default function Home() {
  const [modalShow, setModalShow] = useState(false);
  if (typeof window !== 'undefined' && !localStorage.hasOwnProperty('userData')) {
    Router.push('/');
  }
  return (
    <>
      <NaviBar />
      {typeof window !== 'undefined' && localStorage.hasOwnProperty('userData') && (
        <>
          <div className={styles.container}>
            <Container>
              <Row>
                <Col lg="6" className={styles.img}>
                  <Image src={img} alt="#" width={500} height={300} />
                </Col>
                <Col lg="6" className={styles.padding}>
                  <div className="mt-5 text-white ">
                    <h2>Lorem Ipsum</h2>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto reiciendis quo illo nesciunt maxime
                      autem fugiat recusandae sequi quam dolore accusamus quia ducimus, aut necessitatibus earum.
                      Magnam, iure. Quia, quis.
                    </p>
                  </div>

                  <Button variant="primary" onClick={() => setModalShow(true)} className={`btn ${styles.btnLight}`}>
                    Create A Workspace
                  </Button>

                  <CenteredModal show={modalShow} onHide={() => setModalShow(false)} />
                </Col>
              </Row>
            </Container>
          </div>
        </>
      )}
      <>
        <div className={styles.container}>
          <Container>
            <Row>
              <Col>
                <div className="mt-5 text-white ">
                  <h2>My Workspaces</h2>
                </div>
              </Col>
            </Row>
            {/* MAP THIS SHIT */}
            {/* <Row>
              <Col>
                <Card className={styles.workspaceCard}>
                  <Card.Body>
                    <div className={`d-flex ${styles.relative}`}>
                      <div className={styles.circle}>LI</div>
                      <div className={styles.workspaceName}>Lorem Ipsum</div>
                      <div className={`btn ${styles.launchButton}`}>Launch Workspace</div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row> */}
            <Workspace />
            <Container>
              <Row>
                <Col>
                  <Button className={styles.addWorkspace} onClick={() => setModalShow(true)}>
                    <div className={styles.workspaceName}>Add New Workspace</div>
                  </Button>
                </Col>
              </Row>
            </Container>
          </Container>
        </div>
      </>
    </>
  );
}
