import styles from '../styles/Workspace.module.css';
import {Row, Col, Button} from 'react-bootstrap';
import {gql, useMutation, useQuery} from '@apollo/client';
import { useEffect } from 'react';
import Swal from 'sweetalert2'

function Invites({data,  declineinv, acceptinv}) {
  let {id, name} = data
  let shortName = ''

  if(name.split(' ').length > 1) {
    let name1 = name.split(' ').shift()[0].toUpperCase()
    let name2 = name.split(' ').pop()[0].toUpperCase()
    shortName = name1 + name2
  }else{
    shortName = name[0].toUpperCase()
  }

  const ACCEPT = gql`
    mutation AddUserIntoWorkspace($userId: String, $workspaceId: String, ) {
      addUserIntoWorkspace( workspace : {user_id: $userId, workspace_id: $workspaceId}) {
        users
      }
    }
  `

  const DECLINE = gql`
    mutation DeclineWorkspaceInv($userId: String, $workspaceId: String) {
      declineWorkspaceInv(workspace : {user_id: $userId, workspace_id: $workspaceId}) {
        workspace
      }
    } 
  `

  const [accept, acceptData] = useMutation(ACCEPT, {
    onError: () => acceptData.error
  })

  const [decline, declineData] = useMutation(DECLINE, {
    onError: () => declineData.error
  })

  const acceptHandler = () => {
    accept({
      variables : {
        userId : JSON.parse(localStorage.getItem('userData')).user.id,
        workspaceId : id
      }
    })
  }

  const declineHandler = () => {
    decline({
      variables : {
        userId : JSON.parse(localStorage.getItem('userData')).user.id,
        workspaceId : id
      }
    })
  }

  useEffect(() => {
    if(acceptData.data){
      Swal.fire(
        'Accept',
        'You accept the invitation !',
        'success'
      )
      acceptinv()
    }

    if(acceptData.error){
      console.log(JSON.stringify(acceptData.error, null, 2));
    }
  }, [acceptData.data, acceptData.error])

  useEffect(() => {
    if(declineData.data){
      Swal.fire({
        title: 'Are you sure?',
        text: "You want to decline this invitation?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Decline',
            'Invitation declined',
            'success'
          )
        }
      })
      declineinv()
    }

    if(declineData.error){
      console.log(JSON.stringify(declineData.error, null, 2));
    }
  }, [declineData.data, declineData.error])

  return (
    <Row className="mt-2 p-3">
      <Col>
        <div className={`d-flex ${styles.relative}`}>
          <div className={styles.circle}>{shortName}</div>
          <div className={styles.workspaceName}>{name}</div>
          <div className={styles.endButtons}>
            <Button type="submit" className={styles.accept} onClick={acceptHandler}>
              ✔
            </Button>
            <em> </em>
            <Button type="submit" className={styles.decline} onClick={declineHandler}>
              ✖
            </Button>
          </div>
        </div>
      </Col>
    </Row>
  );
}

export default Invites;
