import styles from '../../styles/WorkspaceChat.module.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import {useState, useEffect} from 'react';
import {gql, useQuery, useMutation, useSubscription} from '@apollo/client';
import SingleChat from './singleChat'

function Chat({channel}){
    const [chats, setChats] = useState(null)
    var name = ''
    var repeat = 0

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

    const gettingChatData = useSubscription(CHAT_RECEIVED, {
        variables: {
            channelId : channel.id
        }
    })

    const [sendChat, sendChatData] = useMutation(SEND_CHAT, {
        onError : function() {return sendChatData.error}
      })

    const fetchChat = useQuery(GET_CHATS, {
        variables : {
            id : channel.id
        }
    })

    // console.log(chats)
    
    useEffect(() => {
        if(fetchChat.data){
            setChats(fetchChat.data.getChat)
        }
    }, [fetchChat])

      const sendMsg = (e) => {  
        // e.preventDefault()
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

    useEffect(() => {
        // console.log(gettingChatData.data)
        if(gettingChatData.data && !gettingChatData.loading){
            fetchChat.refetch()
        }
    }, [gettingChatData])

    // document.getElementById('mesasge').onSubmit(function() {return false})

    return(
        <div className={styles.chatboxContainer}>
            <div className={styles.relative}>
              <div className={styles.channelName}>
                <h3 className="p-3">{
                  "#" + channel.name.charAt(0).toUpperCase() + channel.name.slice(1)
                }</h3>
              </div>
              <div className={styles.chats}>
                {
                  fetchChat.loading &&
                  <div className={styles.center}>
                    <h1>Loading...</h1>
                  </div>
                }
                {
                  chats && chats.length > 0 && !fetchChat.loading ? 
                  <>
                  {
                    chats.map(chat => {
                        if(name == chat.from.username){
                            {repeat += 1}
                            return(
                                <SingleChat chat={chat} repeating={repeat} key={chat.id}/>
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
                                <SingleChat chat={chat} repeating={repeat} shortName={shortName} key={chat.id}/>
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
                <form className={styles.msgBox} onSubmit={e => {
                    e.preventDefault();
                }}>
                  <input type="text" placeholder="Write Message..." className={styles.sendMsg} id="message" onKeyPress={e => {
                    if(e.key == "Enter"){
                      sendMsg()
                    }
                  }}/>
                  <i className={"far fa-paper-plane " + styles.sendIcon} onClick={sendMsg}></i>
                </form>
              </div>
            </div>
          </div>
    )
}

export default Chat