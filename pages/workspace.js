import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Workspace.module.css';
import NaviBar from '../components/partials/Navibar';
import {Container, Row, Col, Button} from 'react-bootstrap';
import CenteredModal from '../components/modals/workspace';
import img from '../components/images/workspace.png';
import {useState} from 'react';

export default function Home() {
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <NaviBar />
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
                  autem fugiat recusandae sequi quam dolore accusamus quia ducimus, aut necessitatibus earum. Magnam,
                  iure. Quia, quis.
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
  );
}
