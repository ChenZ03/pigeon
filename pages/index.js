import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import NaviBar from '../partials/Navibar';
import {Container, Row, Col} from 'react-bootstrap'; 
import {useState} from 'react'
import Register from '../partials/register'
import Login from '../partials/login'
import img from '../components/images/enlargedhp.png';

function Home() {
  const [home, setHome] = useState(true)
  const [login, setLogin] = useState()
  return (
    <>
      <NaviBar setLogin={setLogin} setHome={setHome}/>
      <div className={styles.container}>
        <Container>
          {
            home ?
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

                <button className={`btn ${styles.btnLight}`} onClick={() => {
                    setHome(false)
                    setLogin(false)
                }}>
                  Register
                </button>
                <em> </em>
                <button className="btn text-white" onClick={() => {
                    setHome(false)
                    setLogin(true)
                }}>
                  Login
                </button>
              </Col>
            </Row>
            :
            login ?
            <Login setLogin={setLogin} />
            :
            <Register setLogin={setLogin} />
          }
          
        </Container>
      </div>
    </>
  );
}

export default Home
