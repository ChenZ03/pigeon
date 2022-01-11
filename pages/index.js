import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import NaviBar from './partials/Navibar';
import {Container, Row, Col} from 'react-bootstrap';
import img from './components/images/enlargedhp.png';

export default function Home() {
  return (
    <>
      <NaviBar />
      <div className={styles.container}>
        <Container>
          <Row>
            <Col lg="6" className={styles.img}>
              <Image src={img} alt="#" width={400} height={400} />
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

              <a href="/register" className={`btn ${styles.btnLight}`}>
                Register
              </a>
              <em> </em>
              <a href="/login" className="btn text-white">
                Login
              </a>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
