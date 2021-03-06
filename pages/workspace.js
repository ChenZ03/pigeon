import Image from 'next/image';
import styles from '../styles/Workspace.module.css';
import MainNav from '../components/partials/MainNav';
import {Container, Row, Col, Button, Card} from 'react-bootstrap';
import CenteredModal from '../components/modals/workspace';
import img from '../components/images/workspace.png';
import {useState, useEffect} from 'react';
import Router from 'next/router';
import Workspace from '../components/Workspace';
import {gql, useQuery} from '@apollo/client';

export default function Home() {
  const [modalShow, setModalShow] = useState(false);
  const [workspace, setWorkspace] = useState([]);
  if (typeof window !== 'undefined' && !localStorage.hasOwnProperty('userData')) {
    Router.push('/');
  }

  const GET_WORKSPACE = gql`
    query getWorkSpace($id: String!) {
      getWorkSpace(id: $id) {
        id
        name
      }
    }
  `;
  if (typeof window !== 'undefined') {
    var {loading, error, data, refetch} = useQuery(GET_WORKSPACE, {
      variables: {
        id: JSON.parse(localStorage.getItem('userData')).user.id,
      },
    });
  }

  useEffect(() => {
    if (data) {
      setWorkspace(data.getWorkSpace);
    }
  }, [data]);

  var showWorkspace = workspace?.map((space) => <Workspace key={space.id} data={space} />);

  return (
    <>
      <MainNav invitation={() => refetch()} />
      {typeof window !== 'undefined' && localStorage.hasOwnProperty('userData') && (
        <>
          {workspace?.length === 0 ? (
            <div className={styles.container}>
              <Container>
                <Row>
                  <Col lg="6" className={styles.img}>
                    <Image src={img} alt="#" width={500} height={300} />
                  </Col>
                  <Col lg="6" className={styles.padding}>
                    <div className="mt-5 text-white ">
                      <h2>A virtual workspace for you.</h2>
                      <p>
                        Through your workspace, you can now easily manage your team by separating them into different
                        workspaces. Bring the right people together in channels to share ideas, make decisions, and move
                        work forward with a common purpose and place!
                      </p>
                    </div>

                    <Button variant="primary" onClick={() => setModalShow(true)} className={`btn ${styles.btnLight}`}>
                      Create A Workspace
                    </Button>

                    <CenteredModal show={modalShow} onHide={() => setModalShow(false)} fetch={() => refetch()} />
                  </Col>
                </Row>
              </Container>
            </div>
          ) : (
            <div className={styles.container}>
              <Container>
                <Row>
                  <Col>
                    <div className="mt-5 text-white ">
                      <h2>My Workspaces</h2>
                    </div>
                  </Col>
                </Row>
                {showWorkspace}
                <Container>
                  <Row>
                    <Col>
                      <Button className={styles.addWorkspace} onClick={() => setModalShow(true)}>
                        <div className={styles.addWorkspaceText}>+ Add New Workspace</div>
                      </Button>

                      <CenteredModal show={modalShow} onHide={() => setModalShow(false)} fetch={() => refetch()} />
                    </Col>
                  </Row>
                </Container>
              </Container>
            </div>
          )}
        </>
      )}
      <></>
    </>
  );
}
