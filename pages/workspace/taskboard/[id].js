import {Container} from 'react-bootstrap';
import NaviBar from '../../../components/partials/Navibar';
import styles from '../../../styles/Taskboard.module.css';

// idk hwo to slug this yet fangzhe here xian
function Taskboard() {
  return (
    <>
      <NaviBar />
      <div className={styles.container}>
        <h4>Workspace 1 - Task Board</h4>
      </div>
    </>
  );
}

export default Taskboard;
