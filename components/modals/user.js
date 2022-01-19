import {Modal, Button, Container, Form, Row, Col} from 'react-bootstrap';
import styles from '../../styles/Workspace.module.css';
import {gql, useMutation, useQuery} from '@apollo/client';
import {useState, useEffect} from 'react';

function UserModal(props) {
  const [userList, setUserList] = useState([]);
  const [search, setSearch] = useState('');

  const GET_SPACE_USERS = gql`
    query GetAllSpaceUsers($user_id: String) {
      getAllSpaceUsers(id: $user_id) {
        id
        username
      }
    }
  `;

  const GET_ALL_USERS = gql`
    query GetAllUsers($name: String) {
      getAllUsers(name: $name) {
        id
        username
      }
    }
  `;

  const INVITE_USER = gql`
    mutation InviteUserToWorkspace($userId: String, $workspaceId: String) {
      inviteUserToWorkspace(workspace: {user_id: $userId, workspace_id: $workspaceId}) {
        id
        pending
      }
    }
  `;

  const REMOVE_USER = gql`
    mutation RemoveUserFromWorkspace($userId: String, $workspaceId: String) {
      removeUserFromWorkspace(workspace: {user_id: $userId, workspace_id: $workspaceId}) {
        workspace
      }
    }
  `;

  const spaceUser = useQuery(GET_SPACE_USERS, {
    variables: {
      //this is workspace_id not user
      user_id: props.id,
    },
  });

  const AllUser = useQuery(GET_ALL_USERS, {
    variables: {
      name: search,
    },
  });

  const [invite, inviteData] = useMutation(INVITE_USER, {
    onError: () => inviteData.error,
  });

  const [remove, removeData] = useMutation(REMOVE_USER, {
    onError: () => removeData.error,
  });

  useEffect(() => {
    if (spaceUser.data && props.type == 'users') {
      setUserList(spaceUser.data.getAllSpaceUsers);
    }
  }, [spaceUser]);

  useEffect(() => {
    if (AllUser.data && props.type == 'invite') {
      setUserList(AllUser.data.getAllUsers);
    }
  }, [AllUser]);

  const removeUser = (id) => (event) => {
    event.preventDefault();
    remove({
      variables: {
        userId: id,
        workspaceId: props.id,
      },
    });
  };

  const inviteUser = (id) => (event) => {
    event.preventDefault();
    invite({
      variables: {
        workspaceId: props.id,
        userId: id,
      },
    });
  };

  useEffect(() => {
    if (inviteData.data) {
      window.alert('User Invited successfully');
    }

    if (inviteData.error) {
      window.alert('Pending Invitation / User exist in workspace');
    }
  }, [inviteData.data, inviteData.error]);

  useEffect(() => {
    if (removeData.data) {
      window.alert('User removed');
      spaceUser.refetch();
    }

    if (removeData.error) {
      window.alert('Error');
    }
  }, [removeData.data, removeData.error]);

  const onChangeHandler = (e) => {
    setSearch(e.target.value);
    AllUser.refetch();
  };

  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.type == 'invite' ? 'Invite User to Workspace!' : 'Users'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.modelSize}>
        <Container>
          {
            <>
              {props.type == 'invite' && (
                <div className={styles.search}>
                  <input
                    type="text"
                    placeholder="Search Username"
                    className={styles.searchInput}
                    onChange={onChangeHandler}
                  />
                </div>
              )}
              {userList ? (
                userList.map((user) => {
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
                        {props.type == 'invite' ? (
                          <div className={styles.buttonAction}>
                            <button className={`btn ${styles.invite}`} onClick={inviteUser(user.id)}>
                              INVITE
                            </button>
                          </div>
                        ) : (
                          JSON.parse(localStorage.getItem('userData')).user.id !== user.id &&
                          typeof window !== 'undefined' &&
                          JSON.parse(localStorage.getItem('userData')).user.id == props.owner && (
                            <div className={styles.buttonAction}>
                              <button className={`btn ${styles.remove}`} onClick={removeUser(user.id)}>
                                REMOVE
                              </button>
                            </div>
                          )
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

export default UserModal;
