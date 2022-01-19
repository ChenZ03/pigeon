import {useState, useEffect, useRef } from 'react';
import {gql, useMutation, useQuery} from '@apollo/client';
import {Form, Button} from 'react-bootstrap';
import styles from '../../styles/Register.module.css';
import jwt_decode from 'jwt-decode'

function Login({setLogin, loginHandler}) {
  const [user, setUser] = useState({});
  const clientId = '137944324026-ku0kjalf18s7c9r7qfaum4amgcahjlh4.apps.googleusercontent.com'
  const btnDivRef = useRef()

  const LOGIN = gql`
    mutation login($email: String!, $password: String!) {
      login(user: {email: $email, password: $password}) {
        token
      }
    }
  `

  const GOOGLELOGIN = gql`
    mutation GoogleLogin($email : String!, $username: String!) {
      googleLogin (user : {email : $email, username : $username}) {
        token
      }
    }
  `

  const [googleLogin, glogin] = useMutation(GOOGLELOGIN, {
    onError: () => glogin.error
  })

  const [login, loginData] = useMutation(LOGIN, {
    onError : () => loginData.error
  });


  const onSubmitHandler = (e) => {
    e.preventDefault();
      login({
        variables: user,
      });
      e.target.reset();
  };

  const onChangeHandler = (e) => {
    setUser({...user, [e.target.name]: e.target.value});
  };

  useEffect(() => {
    if(loginData.error){
      alert(loginData.error)
    }

    if(loginData.data){
      alert("Login Successfully")
      loginHandler(loginData.data.login.token)
    }
  }, [loginData.data, loginData.error])

  useEffect(() => {
    if(glogin.error){
      alert(glogin.error)
      // console.log(glogin.error)
    }

    if(glogin.data){
      alert("Login Successfully")
      loginHandler(glogin.data.googleLogin.token)
    }
  }, [glogin.data, glogin.error])
  
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
              <Form.Control className={styles.formControl} type="email" placeholder="name@example.com" name="email" onChange={onChangeHandler}/>
            </Form.Group>
            <Form.Group>
              <Form.Label className={styles.formLabel}>Password</Form.Label>
              <Form.Control className={styles.formControl} type="password" name="password" placeholder="Password" onChange={onChangeHandler}/>
            </Form.Group>
            <small className="text-white">
              Don't have an account yet?{' '}
              <a className={styles.atext} onClick={() =>{
                setLogin(false)
              }}>
                Sign up here
              </a>
            </small>
            <Button type="submit" className={styles.formButton}>
              Login
            </Button>
            <div>
              <div id="buttonDiv" className="d-flex justify-content-center p-3 m-3" ref={btnDivRef}></div>
            </div>
          </Form>
      </div>
    </>
  );
}

export default Login;
