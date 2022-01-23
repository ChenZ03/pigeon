import {useState, useEffect, useRef} from 'react';
import {gql, useMutation} from '@apollo/client';
import {Form, Button, Container} from 'react-bootstrap';
import styles from '../../styles/Register.module.css';
import jwt_decode from 'jwt-decode'
import Swal from 'sweetalert2'

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
      Swal.fire(
        'Password',
        'Password must be the same',
        'error'
      )
    }
  };

  const onChangeHandler = (e) => {
    setUser({...user, [e.target.name]: e.target.value});
  };

  const REGISTER = gql`
    mutation register($email: String!, $username: String!, $password: String!) {
      register(user: {email: $email, username: $username, password: $password}) {
        token
      }
    }
  `;

  const GOOGLELOGIN = gql`
    mutation GoogleLogin($email : String!, $username: String!) {
      googleLogin (user : {email : $email, username : $username}) {
        token
      }
    }
  `

  const [register, registerdata] = useMutation(REGISTER,{
    onError: () => registerdata.error
  });

  const [googleLogin, glogin] = useMutation(GOOGLELOGIN, {
    onError: () => glogin.error
  })


  // Google
  useEffect(() => {
    if(glogin.error){
      Swal.fire(
        'Google Login',
        glogin.error,
        'error'
      )
    }

    if(glogin.data){
      Swal.fire(
        'Google Login',
        'Login Successfully',
        'success'
      )
      loginHandler(glogin.data.googleLogin.token)
    }
  }, [glogin.data, glogin.error])

  useEffect(() => {
    if(registerdata.data) {
      Swal.fire(
        'Register',
        'Registered successfully',
        'success'
      )
      loginHandler(registerdata.data.register.token)
    }

    if(registerdata.error){
      Swal.fire(
        'Register',
        'Registration Failed',
        'error'
      )
      console.log(registerdata.error)
    }
  }, [registerdata.data, registerdata.error])

  
  useEffect(() => { 
    const handleGoogleSignIn = async res => {
        let decoded = jwt_decode(res.credential)  
        // console.log(decoded)
        googleLogin({
          variables : {
            email : decoded.email,
            username : decoded.given_name
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
