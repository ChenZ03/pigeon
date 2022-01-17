import {useRouter} from 'next/router';
import WorkspaceNav from '../../components/partials/WorkspaceNav';
import {Nav, Navbar, Container, Row, Col, Form, Button} from 'react-bootstrap';
import styles from '../../styles/WorkspaceChat.module.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import {useState, useEffect} from 'react';
import {gql, useQuery, useMutation, useSubscription} from '@apollo/client';
import Router from 'next/router';

function WorkspaceChat() {
  const router = useRouter();
  const {id} = router.query;
  const [showDropDown, setShowDropDown] = useState(false);
  const [channel, setChannel] = useState(null);
  const [workspace, setWorkspace] = useState(null)
  const [channelList, setChannelList] = useState(null)
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

  const GET_CHATS = gql`
    query GetChat($Id: String) {
      getChat(id: $Id) {
        name
        chat
      }
    }
  `

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
    console.log(id)
    setChannel(id[1])
  }

  if(channel && workspace && channelList){
    return (
      <div className={styles.all}>
        <WorkspaceNav />
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
                  }}
                ></i>
                Channels
              </div>
              {showDropDown && (
                <>
                  {
                    channelList.map(chn => {
                      return (
                        <Nav.Link className={styles.navLink2} onClick={changeChannel([chn.id, chn.name])}>
                          {chn.name.charAt(0).toUpperCase() + chn.name.slice(1)}
                        </Nav.Link>
                      )
                    })
                  }
                </>
              )}
            </Nav>
          </div>
          <div className={styles.chatboxContainer}>
            <div className={styles.relative}>
              <div className={styles.channelName}>
                <h3 className="p-3">{
                  "#" + channel.name.charAt(0).toUpperCase() + channel.name.slice(1)
                }</h3>
              </div>
              <div className={styles.msgContainer}>
                <form className={styles.msgBox}>
                  <input type="text" placeholder="Write Message..." className={styles.sendMsg} />
                  <i className={"far fa-paper-plane " + styles.sendIcon}></i>
                </form>
              </div>
            </div>
          </div>
        </Row>
      </div>
    );
  }else{
    return <h1>Loading...</h1>
  }

  
}

export default WorkspaceChat;
