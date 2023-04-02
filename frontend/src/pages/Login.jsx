import React, { useState, useContext } from 'react';
import UserContext from '../context/UserContext';
import axios from '../Axios/axios'
import classes from '../static/login.module.css';
import resets from '../static/_resets.module.css';

function LoginPage() {
  const { setToken } = useContext(UserContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = (event) => {
    event.preventDefault();
    // Perform login validation here
    axios.post('/login', { email, password })
      .then((response) => {
        setToken(response.data.token);
        
        setLoggedIn(true);
      })
  }

  const handleLogout = (event) => {
    event.preventDefault();
    setLoggedIn(false);
  }

  if (loggedIn) {
    return (
      <div>
        <p>You are logged in!</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  }

  return (
    <div className={`${resets.storybrainResets} ${classes.root}`}>
      <div className={classes.frame1707478296}>
        <div className={classes.frame90}>
          <div className={classes.frame1707478297}>
            <div className={classes.welcomeWrapper}>
              <div style={{
                width: "min-content",
                height: "min-content",
                padding: "4px"
              }}>
                <div className={classes.welcomeToDinoBud}>Welcome to DinoBud!</div>
              </div>
            </div>
          </div>
          <div className={classes.frame1707478298}>
            <div className={classes.frame1707478299}>
              <div className={classes.frame84}>
                <div className={classes.frame1707478300}>
                  <div className={classes.EverWantedToLearnSomethingButD}> 
                    😳 Ever wanted to learn something but didn’t have time?
                  </div>
                </div>
                <div className={classes.frame1707478301}>
                  <div className={classes.withDinoBudYouCanSetYourLearni}>
                    With DinoBud, you can set your learning goal, add tasks, and invite an accountability partner. The
                    best part? You raise a dino together!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.frame1707478295}>
        <form className={classes.frame67} onSubmit={handleLogin}>
          <div className={classes.unnamed}>🦖</div>
          <div className={classes.frame65}>
            <div className={classes.email}>Email</div>
            <div className={classes.emailWrapper}>
              <input className={classes.enterEmail} placeholder='Enter email' type="text" value={email} onChange={(event) => setEmail(event.target.value)} ></input>
            </div>
          </div>
          <div className={classes.frame66}>
            <div className={classes.password}>Password</div>
            <div className={classes.emailWrapper}>
              <input className={classes.enterEmail} placeholder='Enter password' type="password" value={password} onChange={(event) => setPassword(event.target.value)}></input>
            </div>
          </div>
          <button className={classes.frame83} type="submit">
            <div className={classes.frame24}>
              <div className={classes.login}>Login</div>
            </div>
          </button>
          <div className={classes.newUserSignUp}>
            <p className={classes.labelWrapper}>
              <span className={classes.label}>New user?</span>
              <span className={classes.label2}> </span>
              <a className={classes.label3} href="/signup">Sign up</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage;