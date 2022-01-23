import {Modal, Button, Container, Form, Row, Col} from 'react-bootstrap';
import styles from '../../styles/Workspace.module.css';
import {gql, useMutation, useQuery} from '@apollo/client';
import {useState, useEffect} from 'react';
import Swal from 'sweetalert2'

function EditModal(props) {
    const [taskDetails, setTaskDetails] = useState({
        title : props.task.title,
        description : props.task.description,
        id : props.task.id
    })

    const EDIT_TASK = gql`
        mutation EditTask($id : ID, $title : String, $description : String) {
            editTask(task : {id : $id, title : $title, description : $description}) {
            title
            description
            }
        }
    `

    const [editTask, editTaskData] = useMutation(EDIT_TASK)

    const onSubmitHandler = (e) => {
        e.preventDefault();
        if(taskDetails.title.length < 1 || taskDetails.description.length < 1){
            Swal.fire(
                "WEI",
                "Title and description length must be more than 1 character",
                "error"
            )
        }else{
            editTask({
                variables : taskDetails
            })
        }
        
    }

    useEffect(() => {
        if(editTaskData.data){
            Swal.fire(
                "Edit Task",
                "Task edited successfully",
                "success"
            )
            props.onHide()
            props.refetch()
        }
    
    }, [editTaskData.data])

    const onChangeHandler = (e) => {
        setTaskDetails({...taskDetails,
            [e.target.name]: e.target.value
        })
    }
    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Edit Task
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className={styles.modelSize}>
            <Container>
            <Form onSubmit={onSubmitHandler} className={styles.width}>
                <Row>
                <Col lg="10">
                    <Form.Group>
                    <label>Title : </label>
                    <Form.Control
                        className={`pt-4 ${styles.formControl}`}
                        type="text"
                        placeholder="Task Title"
                        name="title"
                        id="title"
                        value={taskDetails.title}
                        onChange={onChangeHandler}
                    />
                    </Form.Group>
                </Col>
                </Row>
                <Row>
                <Col lg="10">
                    <Form.Group>
                    <label>Description : </label>
                        <Form.Control
                            className={`pt-4 ${styles.formControl}`}
                            type="text"
                            placeholder="Task description"
                            name="description"
                            id="description"
                            value={taskDetails.description}
                            onChange={onChangeHandler}
                        />
                        </Form.Group>
                    </Col>
                </Row>
                <Button type="submit" className={styles.formButton}>
                    Edit
                </Button>
            </Form>
            </Container>
          </Modal.Body>
        </Modal>
      );
}

export default EditModal