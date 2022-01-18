import {Modal, Button, Container, Form, Row, Col} from 'react-bootstrap';
import styles from '../../styles/Workspace.module.css';
import {gql, useMutation, useQuery} from '@apollo/client';
import {useState, useEffect} from 'react';

function UserModal(props) {
    const [userList, setUserList] = useState([])
    const GET_SPACE_USERS = gql`
        query GetAllUsers($user_id: String) {
            getAllSpaceUsers(id: $user_id) {
            id
            username
            }
        }
    `

    const GET_ALL_USERS = gql`
        query GetAllUsers {
            getAllUsers {
            id
            username
            }
        }
    `
    
    const spaceUser = useQuery(GET_SPACE_USERS, {
        variables: {
            user_id : props.id
        }
    })

    const AllUser = useQuery(GET_ALL_USERS)

    useEffect(() => {
        if(spaceUser.data && props.type == "users"){
            setUserList(spaceUser.data.getAllSpaceUsers)
        }
    }, [spaceUser])

    useEffect(() => {
        if(AllUser.data && props.type == "invite"){
            setUserList(AllUser.data.getAllUsers)
        }
    }, [AllUser])

    console.log(userList)


    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">{props.type == "invite" ? "Invite User to Workspace!" : "User list"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Container>
                
            </Container>
        </Modal.Body>  
        </Modal>
    );
}

export default UserModal;