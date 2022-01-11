import styles from '../styles/Register.module.css';
import {Form, Button, Container} from 'react-bootstrap';
import NaviBar from './partials/Navibar';

function Register() {
  const onSubmitHandler = () => {};
  const onChangeHandler = () => {};

  return (
    <>
      <NaviBar />
      <div className={styles.container}>
        <Container>
          <Form onSubmit={onSubmitHandler} className={styles.width}>
            <Form.Group>
              <Form.Label className={styles.formLabel}>Email address</Form.Label>
              <Form.Control className={styles.formControl} type="email" placeholder="name@example.com" name="email" />
            </Form.Group>
            <Form.Group>
              <Form.Label className={styles.formLabel}>Username</Form.Label>
              <Form.Control className={styles.formControl} type="text" name="username" placeholder="Username" />
            </Form.Group>
            <Form.Group>
              <Form.Label className={styles.formLabel}>Password</Form.Label>
              <Form.Control className={styles.formControl} type="password" name="password" placeholder="Password" />
            </Form.Group>
            <Form.Group>
              <Form.Label className={styles.formLabel}>Confirm Password</Form.Label>
              <Form.Control
                className={styles.formControl}
                type="password"
                name="password2"
                placeholder="Confirm Password"
              />
            </Form.Group>
            <small className="text-white">
              Already have an account?{' '}
              <a className="text-white" href="/login">
                Sign in here
              </a>
            </small>
            <Button type="submit" className={styles.formButton}>
              Register
            </Button>
          </Form>
        </Container>
      </div>
    </>
  );
}

export default Register;
