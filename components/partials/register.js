import {useState, useEffect, useRef} from 'react';
import {gql, useMutation} from '@apollo/client';
import {Form, Button, Container} from 'react-bootstrap';
import styles from '../../styles/Register.module.css';
import jwt_decode from 'jwt-decode'

function Register({setLogin, loginHandler}) {
  const [user, setUser] = useState({});
  const clientId = '137944324026-ku0kjalf18s7c9r7qfaum4amgcahjlh4.apps.googleusercontent.com'
  const btnDivRef = useRef()

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

  const GOOGLELOGIN = gql`
    mutation GoogleLogin($email : String!) {
      googleLogin (user : {email : $email}) {
        token
      }
    }
  `

  var [register, {data, loading, error}] = useMutation(REGISTER,{
    onError: () => error
  });

  var [googleLogin, {data, loading, error}] = useMutation(GOOGLELOGIN, {
    onError: () => error
  })

  useEffect(() => {
    if(error) alert(error.message);
  }, [error])

  useEffect(() => {
    if(data) {
      if(data.googleLogin.token){
        loginHandler(data.googleLogin.token)
      }else{
        alert("Registered successfully, please proceed to login")
        setLogin(true)
      }
      
    }
  }, [data])

  
  useEffect(() => { 
      const handleGoogleSignIn = async res => {
          let decoded = jwt_decode(res.credential)  
          googleLogin({
            variables : {
              email : decoded.email,
              username : decoded.username
            }
          })
      }

      const initializeGsi = _ => {
          if(!window.google) return;
        
          window.google.accounts.id.initialize({
          client_id: clientId,
          callback: handleGoogleSignIn
          });
          window.google.accounts.id.renderButton(
          btnDivRef.current,
          { theme: "outline", size: "large" }  // customization attributes
          );

      }

      const script = document.createElement('script')
      script.src = "https://accounts.google.com/gsi/client"
      script.onload = initializeGsi
      script.async = true
      script.id = 'google-script'
      document.querySelector('head')?.appendChild(script)

      return _ => {
          document.getElementById("google-script")?.remove()
          window.google?.accounts.id.cancel()
      }
  }, [])

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
          <div>
            <div id="buttonDiv" className="d-flex justify-content-center p-3 m-3" ref={btnDivRef}></div>
          </div>
      </div>
    </>
  );
}

export default Register;
