import {useRouter} from 'next/router';
import WorkspaceNav from '../../components/partials/WorkspaceNav';
import {Nav, Navbar, Container, Row, Col, Form, Button} from 'react-bootstrap';
import styles from '../../styles/WorkspaceChat.module.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import {useState, useEffect} from 'react';
import {gql, useQuery, useMutation, useSubscription, useLazyQuery} from '@apollo/client';
import Router from 'next/router';
import AddChannel from '../../components/partials/addChannel'
import Chat from '../../components/partials/chat.js'


function WorkspaceChat() {
  const router = useRouter();
  const {id} = router.query;
  const [showDropDown, setShowDropDown] = useState(false);
  const [channel, setChannel] = useState(null);
  const [workspace, setWorkspace] = useState(null)
  const [channelList, setChannelList] = useState(null)
  
  const [addingChannel, setAddChannel] = useState(false)

  if (typeof window !== 'undefined' && !localStorage.hasOwnProperty('userData')) {
    Router.push('/');
  }

  const GET_CHANNELS = gql`
    query GetChannels($id: String) {
      getChannels(id: $id) {
        id
        name
      }
    }
  `


  const GET_CURRENTSPACE = gql`
    query GetCurrentWorkSpace($id: String) {
      getCurrentWorkSpace(id: $id) {
        id
        name
        owner
        channels
        users
      }
    }
  `

  const REMOVE_USER = gql`
    mutation RemoveUserFromWorkspace($userId : String, $workspaceId : String) {
        removeUserFromWorkspace(workspace : {user_id : $userId, workspace_id : $workspaceId}) {
        workspace
        }
    }
  `

  const [remove, removeData] = useMutation(REMOVE_USER, {
      onError : () => removeData.error
  })

  const {loading, error, data, refetch} = useQuery(GET_CHANNELS, {
    variables: {
      id: id
    },
  });

  const workspaceData = useQuery(GET_CURRENTSPACE, {
    variables: {
      id : id
    }
  })


  useEffect(() => {
    if(workspaceData.data){
      setWorkspace(workspaceData.data.getCurrentWorkSpace)
    }

    if(workspaceData.error){
      alert("Workspace not found")
      Router.push('/workspace')
    }
  }, [workspaceData])

  useEffect(() => {
    if(data){
      setChannel(data.getChannels[0])
      setChannelList(data.getChannels)
    }
  }, [data])

  


  useEffect(() => {
    if(error){
      alert("Workspace not found")
      Router.push('/workspace')
    }
  }, [error])

  const changeChannel = id => event => {
    event.preventDefault()
    setChannel({
      id : id[0],
      name : id[1]
    })
  }

  const addChannel = () => {
    setShowDropDown(true)
    setAddChannel(!addingChannel)
  }

  const leave = () => {
    if(typeof window !== 'undefined' && JSON.parse(localStorage.getItem('userData')).user.id == workspace.owner){
      console.log('owner')
    }else{
      remove({
        variables : {
          userId : JSON.parse(localStorage.getItem('userData')).user.id,
          workspaceId : id
        }
      })
    }
  }

  useEffect(() => {
    if(removeData.data){
      Router.push('/workspace')
    }
    if(removeData.error){
      console.log(removeData.error)
    }
  }, [removeData])

  

  if(channel && workspace && channelList){
    return (
      <div className={styles.all}>
        <WorkspaceNav id={id}  owner={workspace.owner}/>
        <Row className={styles.row}>
          <div className={styles.navContainer}>
            <Nav defaultActiveKey="/workspace" className={styles.sideNav}>
              <Navbar.Brand className={styles.navBrand}>
                {workspace.name}
              </Navbar.Brand>
              <div className={styles.navLink} onClick={() => Router.push(`/workspace/taskboard/taskboard`)}>
                <i className={"fas fa-tasks " + styles.icon}></i>
                Task Board
              </div>
  
              <div className={styles.navLink} href="link-2">
                <i className={"fas fa-caret-down " + styles.icon} onClick={() => {
                    showDropDown === true ? setShowDropDown(false) : setShowDropDown(true);
                    setAddChannel(false)
                  }}
                ></i>
                Channels
              </div>
              {showDropDown && (
                <>
                  {
                    channelList.map(chn => {
                      return (
                        <Nav.Link className={styles.navLink2} onClick={changeChannel([chn.id, chn.name])} key={chn.id}>
                          {'#' + chn.name.charAt(0).toUpperCase() + chn.name.slice(1)}
                        </Nav.Link>
                      )
                    })
                  }
                  {addingChannel && <AddChannel channelList={channelList} setAddChannel={setAddChannel} id={id} refetch={refetch} />}
                </>
              )}
              {
                typeof window !== 'undefined' && JSON.parse(localStorage.getItem('userData')).user.id == workspace.owner &&
                <div className={styles.channelLink}>
                    <p className={styles.addChannel} onClick={addChannel}>Add Channel</p>
                </div>
              }

              <div className={styles.leave}>
                {
                  typeof window !== 'undefined' && JSON.parse(localStorage.getItem('userData')).user.id !== workspace.owner ?
                  <button className={styles.addChannel} onClick={leave}>Leave Workspace</button>
                  :
                  <button className={styles.addChannel} onClick={leave}>Delete Workspace</button>
                }
              </div>
             
            </Nav>
          </div>
          <Chat channel={channel} />
              
        </Row>
      </div>
      
    );
  }else{
    return <h1>Loading...</h1>
  }

  
}

export default WorkspaceChat;
