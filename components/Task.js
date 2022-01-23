import {Card, Col, Container, ToastBody} from 'react-bootstrap';
import styles from '../styles/Taskboard.module.css';
import Router from 'next/router';

function Task({data}) {
  return (
    <Container>
      <Card className={`my-3 ${styles.taskCard}`} onClick={() => Router.push(`/workspace/taskdetails/${data.id}`)}>
        <Card.Body>
          <Card.Title>{data.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{data.description}</Card.Subtitle>
        </Card.Body>
        {/* if assigned then show footer else nah, if more than 2 then show the 2+ gua idk */}
        <Card.Footer className={`text-end ${styles.cardFooter}`}>
          {data.assigns.length === 0 ? (
            <p className="text-secondary mb-0">No users assigned yet</p>
          ) : data.assigns.length === 1 ? (
            <>
              {data.assigns.map((name) => {
                var shortName = '';
                if (name.username.split(' ').length > 1) {
                  let name1 = name.username.split(' ').shift()[0].toUpperCase();
                  let name2 = name.username.split(' ').pop()[0].toUpperCase();
                  shortName = name1 + name2;
                } else {
                  shortName = name.username[0].toUpperCase();
                }
                return (
                  <p key={name.id} className={styles.circle}>
                    {shortName}
                  </p>
                );
              })}
            </>
          ) : data.assigns.length === 2 ? (
            <>
              <div className={styles.grouped}>
                {data.assigns.map((name) => {
                  var shortName = '';
                  if (name.username.split(' ').length > 1) {
                    let name1 = name.username.split(' ').shift()[0].toUpperCase();
                    let name2 = name.username.split(' ').pop()[0].toUpperCase();
                    shortName = name1 + name2;
                  } else {
                    shortName = name.username[0].toUpperCase();
                  }
                  return (
                    <div key={name.id} className={styles.assigned}>
                      {shortName}
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <>
              <div className={styles.circle}>2+</div>
            </>
          )}
        </Card.Footer>
      </Card>
    </Container>
  );
}

export default Task;
