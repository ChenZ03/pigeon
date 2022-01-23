import {Modal, Button, Container, Form, Row, Col} from 'react-bootstrap';
import styles from '../../styles/Workspace.module.css';
import {gql, useMutation, useQuery} from '@apollo/client';
import {useState, useEffect} from 'react';
import Swal from 'sweetalert2'

function assignModal(props) {
  let assign_user = []
  for(let i of props.assigns){
    assign_user.push(i.id)
  }
  console.log(props.assigns)
  const [userList, setUserList] = useState([]);

  const GET_SPACE_USERS = gql`
    query GetAllSpaceUsers($user_id: String) {
      getAllSpaceUsers(id: $user_id) {
        id
        username
      }
    }
  `; 

  const ASSIGN_USER = gql`
    mutation AssignUserToTask($id : ID, $user : String) {
      assignUserToTask(task: {id : $id, user : $user}) {
        assigns {
          username
        }
      }
    }
  `

  const REMOVE_USER = gql`
    mutation RemoveUserFromTask($id : ID, $user : String) {
      removeUserFromTask(task: {id : $id, user : $user}) {
        assigns {
          username
        }
      }
    }
  `

  const spaceUser = useQuery(GET_SPACE_USERS, {
    variables: {
      //this is workspace_id not user
      user_id: props.workspace,
    },
  });

  const [assign, assignData] = useMutation(ASSIGN_USER, {
    // onError: () => assignData.error,
  })

  const [remove, removeData] = useMutation(REMOVE_USER, {
    // onError: () => removeData.error,
  })

  useEffect(() => {
    if (spaceUser.data) {
      setUserList(spaceUser.data.getAllSpaceUsers);
    }
  }, [spaceUser]);

  const assignHandler = (id) => event => {
    event.preventDefault();
    assign({
      variables : {
        id : props.id,
        user : id
      }
    })
  }

  const removeHandler = (id) => event => {
    event.preventDefault();
    remove({
      variables : {
        id : props.id,
        user : id
      }
    })
  }

  useEffect(() => {
    if(assignData.error){
      console.log(assignData.error)
    }

    if(assignData.data){
      Swal.fire(
        "Assign",
        "User successfully assigned",
        "success"
      )
      spaceUser.refetch()
      props.refetch()
    }
  }, [assignData.data])

  useEffect(() => {
    if(removeData.error){
      console.log(removeData.error)
    }

    if(removeData.data){
      Swal.fire(
        "Remove",
        "User successfully removed",
        "success"
      )
      spaceUser.refetch()
      props.refetch()
    }
  }, [removeData.data])

    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Assign
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className={styles.modelSize}>
            <Container>
              {
                <>
                  
                  {userList ? (
                    userList.map(user => {
                      let shortName = '';
    
                      if (user.username.split(' ').length > 1) {
                        let name1 = user.username.split(' ').shift()[0].toUpperCase();
                        let name2 = user.username.split(' ').pop()[0].toUpperCase();
                        shortName = name1 + name2;
                      } else {
                        shortName = user.username[0].toUpperCase();
                      }
    
                      return (
                        <Col key={user.id}>
                          <div className={`d-flex ${styles.relative2}`}>
                            <div className={styles.circle}>{shortName}</div>
                            <div className={styles.workspaceName}>{user.username}</div>
                            {!assign_user.includes(user.id) ? (
                              <div className={styles.buttonAction}>
                                <button className={`btn ${styles.invite}`} onClick={assignHandler(user.id)}>
                                  Assign
                                </button>
                              </div>
                            ) : (
                                <div className={styles.buttonAction}>
                                  <button className={`btn ${styles.remove}`} onClick={removeHandler(user.id)}>
                                    REMOVE
                                  </button>
                                </div>
                            )}
                          </div>
                        </Col>
                      );
                    })
                  ) : (
                    <h1>No user found !</h1>
                  )}
                </>
              }
            </Container>
          </Modal.Body>
        </Modal>
      );
}

export default assignModal