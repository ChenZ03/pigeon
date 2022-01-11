import {useState} from 'react';
import {gql, useMutation, useQuery} from '@apollo/client';
import {Form, Button} from 'react-bootstrap';
import styles from '../styles/Register.module.css';

function Login({setLogin}) {
  const [user, setUser] = useState({});
  // const [allUsers, setAllUsers] = useState({});

  const onSubmitHandler = (e) => {
    console.log(user);
    // if (user.password === user.password2) {
    login({
      variables: user,
    });
    e.target.reset();
    // } else {
    //   alert('error');
    // }
  };

  const onChangeHandler = (e) => {
    setUser({...user, [e.target.name]: e.target.value});
  };

  const LOGIN = gql`
    mutation login($email: String!, $password: String!) {
      login(user: {email: $email, password: $password}) {
        token
      }
    }
  `;

  // const GET_ALL_USERS = gql`
  //   query {
  //     getAllUsers {
  //       email
  //       password
  //     }
  //   }
  // `;

  const [login, {loading, error, data}] = useMutation(LOGIN);
  // const {loading, error, data} = useQuery(GET_ALL_USERS);

  return (
    <>
      <div className={styles.container}>
        <Form onSubmit={onSubmitHandler} className={styles.width}>
          <Form.Group>
            <Form.Label className={styles.formLabel}>Email address</Form.Label>
            <Form.Control
              className={styles.formControl}
              type="email"
              placeholder="name@example.com"
              name="email"
              onChange={onChangeHandler}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className={styles.formLabel}>Password</Form.Label>
            <Form.Control
              className={styles.formControl}
              type="password"
              name="password"
              placeholder="Password"
              onChange={onChangeHandler}
            />
          </Form.Group>
          <small className="text-white">
            Don't have an account yet?{' '}
            <a
              className={styles.atext}
              onClick={() => {
                setLogin(false);
              }}
            >
              Sign up here
            </a>
          </small>
          <Button type="submit" className={styles.formButton}>
            Login
          </Button>
        </Form>
      </div>
    </>
  );
}

export default Login;
