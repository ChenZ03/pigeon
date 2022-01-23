import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import MainNav from '../components/partials/MainNav';
import jwt_decode from 'jwt-decode';
import {Container, Row, Col} from 'react-bootstrap';
import {useState, useEffect, useRef} from 'react';
import Register from '../components/partials/register';
import Login from '../components/partials/login';
import img from '../components/images/enlargedhp.png';
import Router from 'next/router';

function Home() {
  const [home, setHome] = useState(true);
  const [login, setLogin] = useState();

  const loginHandler = (token) => {
    let decoded = jwt_decode(token);

    localStorage.setItem('userData', JSON.stringify(decoded));
    localStorage.setItem('token', token);
    Router.push('/workspace');
  };

  if (typeof window !== 'undefined' && localStorage.hasOwnProperty('userData')) {
    Router.push('/workspace');
  }

  return (
    <>
      <MainNav setLogin={setLogin} setHome={setHome} />
      <div className={styles.container}>
        <Container>
          {home ? (
            <Row>
              <Col lg="6" className={styles.img}>
                <Image src={img} alt="#" width={400} height={400} />
              </Col>
              <Col lg="6" className={styles.padding}>
                <div className="mt-5 text-white ">
                  <h2>The future of business communication.</h2>
                  <p>
                    Bring your office with you on the go! You can now access your workspaces easily and communicate with
                    your team to discuss about upcoming projects etc. Assign tasks to your team and keep track of your
                    progress to increase workspace efficiency.
                  </p>
                </div>

                <button
                  className={`btn ${styles.btnLight}`}
                  onClick={() => {
                    setHome(false);
                    setLogin(false);
                  }}
                >
                  Register
                </button>
                <em> </em>
                <button
                  className="btn text-white"
                  onClick={() => {
                    setHome(false);
                    setLogin(true);
                  }}
                >
                  Login
                </button>
              </Col>
            </Row>
          ) : login ? (
            <Login setLogin={setLogin} loginHandler={loginHandler} />
          ) : (
            <Register setLogin={setLogin} loginHandler={loginHandler} />
          )}
        </Container>
      </div>
    </>
  );
}

export default Home;
