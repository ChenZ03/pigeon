import styles from '../../styles/WorkspaceChat.module.css';
function SingleChat({chat, repeating, shortName}) {
    if(repeating > 0){
        return (
            <div className={repeating > 1 ? styles.box : styles.box2} key={chat.id}>
              <p className={styles.singleP}>{chat.chat}</ p>
              <br />
            </div>
          )
    }else{
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
}

export default SingleChat