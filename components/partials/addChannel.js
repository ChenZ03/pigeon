import styles from '../../styles/WorkspaceChat.module.css';
import {gql, useMutation} from '@apollo/client';
import {useEffect} from 'react';
import Swal from 'sweetalert2'

function AddChannel({channelList, setAddChannel, id , refetch}){

    const AddChannel = gql`
        mutation AddChannel($channel_name : String, $workspace_id : String) {
            addChannel(workspace: {
            channel_name : $channel_name,
            workspace_id : $workspace_id
            }) {
                channels
            }
        }
    `

    const [add, addData] = useMutation(AddChannel)

    const channelNameList = channelList.map(chn => chn.name.toLowerCase())

    const acceptHandler = () => {
        let channelName = document.getElementById('channelName').value.toLowerCase()
        if(channelName && channelName.length < 1){
            Swal.fire(
                "Error",
                "Name must be at least 1 character",
                "error"
            )
            return
        }
        if(channelNameList.includes(channelName)){
            Swal.fire(
                "Error",
                "Channel Exists in this workspace",
                "error"
            )
            return
        }
        add({
            variables : {
                channel_name : channelName,
                workspace_id : id
            }
        })

    }

    useEffect(() => {
        if(addData.data){
            setAddChannel(false)
            refetch()
        }

        if(addData.error){
            Swal.fire(
                "Error",
                "Channel limit reached",
                "error"
            )
        }
    }, [addData.data, addData.error])
    return(
        <div className={styles.navLink3}>
            <input type="text" placeholder="Channel Name" className={styles.channelInput} id="channelName"/>
            <button type="submit" className={styles.accept} onClick={acceptHandler}>
              ✔
            </button>
        </div>
    )
}

export default AddChannel