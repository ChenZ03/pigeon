import styles from '../styles/TaskDetails.module.css';

function Comments({data}) {
  let shortName = '';

  if (data.user.username.split(' ').length > 1) {
  let name1 = data.user.username.split(' ').shift()[0].toUpperCase();
  let name2 = data.user.username.split(' ').pop()[0].toUpperCase();
  shortName = name1 + name2;
  } else {
  shortName = data.user.username[0].toUpperCase();
  }
  return (
    <div className={"d-flex " + styles.pad }>
      <div className={styles.circle}>{shortName}</div>
      <p className="px-3 pt-2">{data.comment}</p>
    </div>
  );
}

export default Comments;
