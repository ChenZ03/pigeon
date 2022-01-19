import {useRouter} from 'next/router';
import WorkspaceNav from '../../components/partials/WorkspaceNav';
import {Nav, Navbar, Container, Row, Col, Form, Button} from 'react-bootstrap';
import styles from '../../styles/WorkspaceChat.module.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import {useState, useEffect} from 'react';
import {gql, useQuery, useMutation, useSubscription, useLazyQuery} from '@apollo/client';
import Router from 'next/router';
import AddChannel from '../../components/partials/addChannel'


function WorkspaceChat() {
  const router = useRouter();
  const {id} = router.query;
  const [showDropDown, setShowDropDown] = useState(false);
  const [channel, setChannel] = useState(null);
  const [workspace, setWorkspace] = useState(null)
  const [channelList, setChannelList] = useState(null)
  const [chats, setChats] = useState(null)
  const [addingChannel, setAddChannel] = useState(false)
  const [skip, setSkip] = useState(true)
  var name = ''
  var repeat = 0

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
    query GetChat($id: String) {
      getChat(id: $id) {
        id
        from{
          username
          id
        }
        chat
      }
    }
  `

  const SEND_CHAT = gql`
    mutation SendChat($channel_id : String, $user_id : String , $chat : String) {
      sendChat(chat : {channel_id : $channel_id , user_id : $user_id, chat : $chat}) {
        from{
          id
          username
        }
        chat
      }
    }
  `

  const CHAT_RECEIVED = gql`
    subscription ChatSend($channelId: String) {
      chatSend(channel_id: $channelId) {
        id
        from {
          id
          username
        }
        chat
      }
    }
  `

  var gettingChatData = useSubscription(CHAT_RECEIVED, {
    variables: {
      channelId : "61e010b436518726aba67791"
    }
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

  const [fetchChat, fetchChatData] = useLazyQuery(GET_CHATS)

  const [sendChat, sendChatData] = useMutation(SEND_CHAT, {
    onError : function() {return}
  })

  useEffect(() => {
    if(channel && gettingChatData.data && !gettingChatData.loading){
      console.log(fetchChatData)
      fetchChat({
        variables: {
          id : channel.id
        }
      })
    }
  }, [gettingChatData])


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
    if(channel){
      fetchChat({
        variables: {
          id : channel.id
        }
      })
    }
  }, [channel])

  useEffect(() => {
    if(fetchChatData.data){
      setChats(fetchChatData.data.getChat)
    }
  }, [fetchChatData])


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

  const sendMsg = (e) => {
    let msg = document.getElementById('message').value
    if(msg.length < 1) return
    sendChat({
      variables : {
        channel_id : channel.id,
        user_id : JSON.parse(localStorage.getItem('userData')).user.id,
        chat : msg
      }
    })
    document.getElementById('message').value = ''
  }

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
                          {chn.name.charAt(0).toUpperCase() + chn.name.slice(1)}
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
             
            </Nav>
          </div>
          <div className={styles.chatboxContainer}>
            <div className={styles.relative}>
              <div className={styles.channelName}>
                <h3 className="p-3">{
                  "#" + channel.name.charAt(0).toUpperCase() + channel.name.slice(1)
                }</h3>
              </div>
              <div className={styles.chats}>
                {
                  fetchChatData.loading &&
                  <div className={styles.center}>
                    <h1>Loading...</h1>
                  </div>
                }
                {
                  chats && chats.length > 0 && !fetchChatData.loading ? 
                  <>
                  {
                    chats.map(chat => {
                      if(name == chat.from.username){
                        repeat += 1
                        return (
                          <div className={repeat > 1 ? styles.box : styles.box2} key={chat.id}>
                            <p className={styles.singleP}>{chat.chat}</p>
                            <br />
                          </div>
                        )
                      }else{
                        repeat = 0
                        name = chat.from.username
                        let shortName = '';

                        if (chat.from.username.split(' ').length > 1) {
                          let name1 = chat.from.username.split(' ').shift()[0].toUpperCase();
                          let name2 = chat.from.username.split(' ').pop()[0].toUpperCase();
                          shortName = name1 + name2;
                        } else {
                          shortName = chat.from.username[0].toUpperCase();
                        }
  
                        return (
                          <div className={styles.singleChatLeft} key={chat.id}>
                            <div className={styles.flex}>
                              <div className={styles.circle}>{shortName}</div>
                              <div className={styles.margin}>
                                <h5><strong>{chat.from.username}</strong></h5>
                                <p>{chat.chat}</p>
                              </div>
                            </div>
                          </div>
                        )
                      }
                    })
                  }
                  </>
                  :
                  <div className={styles.center}>
                    <h1>No chat history</h1>
                  </div>
                  
                }
              </div>
              <div className={styles.msgContainer}>
                <form className={styles.msgBox}>
                  <input type="text" placeholder="Write Message..." className={styles.sendMsg} id="message" />
                  <i className={"far fa-paper-plane " + styles.sendIcon} onClick={sendMsg}></i>
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
