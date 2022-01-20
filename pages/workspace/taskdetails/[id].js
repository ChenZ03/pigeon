import WorkspaceNav from '../../../components/partials/WorkspaceNav';
import {Button, Card, Col, Container, Nav, Navbar, Row, Form} from 'react-bootstrap';
import styles from '../../../styles/TaskDetails.module.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import {useRouter} from 'next/router';
import Comments from '../../../components/Comments';
import {gql, useQuery, useMutation} from '@apollo/client';
import {useState, useEffect} from 'react'

function TaskDetails() {
  const Router = useRouter();
  const [task, setTask] = useState(null)
  const {id} = Router.query;
  const GET_TASK_DETAILS = gql`
    query GetIndTask($getIndTaskId: String) {
      getIndTask(id: $getIndTaskId) {
        id
        title
        description
        date
        category
        assigns {
          id
          username
        }
        comments {
          user {
            id
            username
          }
          comment
        }
        workspace {
          owner
          id
        }
      }
    }
  `

  const getTaskData = useQuery(GET_TASK_DETAILS, {
    variables : {
      getIndTaskId : id
    }
  })

  useEffect(() => {
    if(getTaskData.data){
      setTask(getTaskData.data.getIndTask)
    }
  }, [getTaskData])


  return (
    <>
      {
        task ? 
        <>
        <WorkspaceNav owner={task.workspace.owner} id={task.workspace.id} />
        <Row>
          <Col lg="2">
            <Nav defaultActiveKey="/workspace" className={styles.sideNav}>
              <Navbar.Brand className={styles.navBrand}>adad</Navbar.Brand>
              <div className={styles.navLink} onClick={() => Router.push(`/workspace/taskboard/${id}`)}>
                <i className={'fas fa-tasks ' + styles.icon}></i>
                Task Board
              </div>
            </Nav>
          </Col>
          <Col lg="10">
            <Container>
              <div className="py-3">
                <h2>{task.title}</h2>
                <h4>{task.description}</h4>
                <p className="text-end">Created by: CHENZHUNGGG</p>
                <p className="pt-5">{"Assign to : " + task.assigns.}</p>
              </div>
              <div>
                <Card>
                  <Card.Body>
                    <Card.Title>Comments</Card.Title>
  
                    {/* Map */}
                    <Comments />
                  </Card.Body>
                  <Card.Footer className="py-3">
                    <Row>
                      <Col lg="10">
                        <Form.Group>
                          <Form.Control type="text" placeholder="Write a comment" />
                        </Form.Group>
                      </Col>
                      <Col lg="2">
                        <Button>Enter</Button>
                      </Col>
                    </Row>
                  </Card.Footer>
                </Card>
              </div>
            </Container>
          </Col>
        </Row>
        </>
        :
        <h1>Loading ...</h1>
      }
    </>
  );
}

export default TaskDetails;
