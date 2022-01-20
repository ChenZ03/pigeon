import WorkspaceNav from '../../../components/partials/WorkspaceNav';
import {Button, Card, Col, Container, Nav, Navbar, Row, Form} from 'react-bootstrap';
import styles from '../../../styles/TaskDetails.module.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import {useRouter} from 'next/router';
import Comments from '../../../components/Comments';
import {gql, useQuery, useMutation} from '@apollo/client';
import {useState, useEffect} from 'react'
import Swal from 'sweetalert2'

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
          name
        }
        user{
          id 
          username
        }
      }
    }
  `

  const ADD_COMMENT = gql`
    mutation AddTaskComment($id : ID, $user : String, $comment : String) {
      addTaskComment(task : {id : $id, user : $user, comment : $comment}) {
        comments {
          comment
        }
      }
    }
  `

  const getTaskData = useQuery(GET_TASK_DETAILS, {
    variables : {
      getIndTaskId : id
    }
  })

  const [addComment, addCommentData] = useMutation(ADD_COMMENT)
  

  useEffect(() => {
    if(getTaskData.data){
      setTask(getTaskData.data.getIndTask)
    }
  }, [getTaskData])

  const commentHandler = () => {
      let comment = document.getElementById('comment').value
      if(comment.length > 0 && comment.length < 50){
        addComment({
          variables : {
            id,
            user : JSON.parse(localStorage.getItem('userData')).user.id,
            comment
          }
        })
      }
  }

  useEffect(() => {
    if(addCommentData.data){
      getTaskData.refetch()
      document.getElementById('comment').value = ''
    }
  }, [addCommentData.data])

  return (
    <>
      {
        task ? 
        <>
        <WorkspaceNav owner={task.workspace.owner} id={task.workspace.id} />
        <Row>
          <Col lg="2">
            <Nav defaultActiveKey="/workspace" className={styles.sideNav}>
              <Navbar.Brand className={styles.navBrand}>{task.workspace.name}</Navbar.Brand>
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
                <br />
                <h4>Description : {task.description}</h4>
                <br />
                <p>{"Date Created : " + Date(task.date).toString()}</p>
                <p className="text-end">{"Created by : " + task.user.username}</p>
                <p className="pt-5">{"Assign to : " + task.assigns.map(e => e.username).join(', ')}</p>
              </div>
              <div>
                <Card>
                  <Card.Body>
                    <Card.Title>Comments</Card.Title>
                    {task.comments.map(comment => <Comments data={comment} />) }
                  </Card.Body>
                  <Card.Footer className="py-3">
                    <Row>
                      <Col lg="10">
                        <Form.Group>
                          <Form.Control type="text" placeholder="Write a comment" id="comment" />
                        </Form.Group>
                      </Col>
                      <Col lg="2">
                        <Button onClick={commentHandler}>Enter</Button>
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
