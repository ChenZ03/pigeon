import {useState, useEffect} from 'react';
import {gql, useMutation} from '@apollo/client';
import {Form, Button, Container} from 'react-bootstrap';
import styles from '../../styles/Register.module.css';

function Register({setLogin}) {
  const [user, setUser] = useState({});

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(user);
    if (user.password === user.password2) {
      register({
        variables: user,
      });
      e.target.reset();
    } else {
      alert("Password must be the same")
    }
  };

  const onChangeHandler = (e) => {
    setUser({...user, [e.target.name]: e.target.value});
  };

  const REGISTER = gql`
    mutation register($email: String!, $username: String!, $password: String!) {
      register(user: {email: $email, username: $username, password: $password}) {
        email
        username
      }
    }
  `;

  const [register, {data, loading, error}] = useMutation(REGISTER,{
    onError: () => error
  });

  useEffect(() => {
    if(error) alert(error.message);
  }, [error])

  useEffect(() => {
    if(data) {
      alert("Registered successfully, please proceed to login")
      setLogin(true)
    }
  }, [data])

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
              <Form.Label className={styles.formLabel}>Username</Form.Label>
              <Form.Control
                className={styles.formControl}
                type="text"
                name="username"
                placeholder="Username"
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
            <Form.Group>
              <Form.Label className={styles.formLabel}>Confirm Password</Form.Label>
              <Form.Control
                className={styles.formControl}
                type="password"
                name="password2"
                placeholder="Confirm Password"
                onChange={onChangeHandler}
              />
            </Form.Group>
            <small className="text-white">
              Already have an account?{' '}
              <a className={styles.atext} onClick={() => {
                setLogin(true)
              }}>
                Sign in here
              </a>
            </small>
            <Button type="submit" className={styles.formButton}>
              Register
            </Button>
          </Form>
      </div>
    </>
  );
}

export default Register;
