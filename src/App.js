import 'bootstrap/dist/css/bootstrap.min.css';

// import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, updateProfile } from "firebase/auth";


import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, updateProfile } from "firebase/auth";

import { useState } from "react";
// import { Button, Col, Form } from 'react-bootstrap';

import './App.css';
import inializeAuthentication from './firebase/firebase.init';

inializeAuthentication();


//providers.......
// const googleProvider = new GoogleAuthProvider();
// const gitHubProvider = new GithubAuthProvider();


function App() {
  const [name, setName] = useState('');
  // const [user, setUser] = useState({});
  const [email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLogin, setIsLogin] = useState(false);

  const auth = getAuth();

  //GOOGLE HANDLE
  // const handleGoogleSignIn = () => {
  //   // const auth = getAuth();
  //   signInWithPopup(auth, googleProvider)
  //     .then(result => {
  //       const { displayName, email, photoURL } = result.user;
  //       const logInUser = {
  //         name: displayName,
  //         email: email,
  //         photo: photoURL
  //       };
  //       setUser(logInUser);
  //     })
  //     .catch(error => {
  //       console.log(error.message);
  //     })
  // }

  //GITHUB HANDLE
  // const handleGithubSignIn = () => {
  //   // const auth = getAuth();
  //   signInWithPopup(auth, gitHubProvider)
  //     .then(result => {
  //       // const user = result.user;
  //       // console.log(user);
  //       const { displayName, photoURL } = result.user;
  //       const logInUser = {
  //         name: displayName,
  //         //   email: email,
  //         photo: photoURL
  //       };
  //       setUser(logInUser);
  //     })
  //     .catch(error => {
  //       console.log(error.message);
  //     })
  // }

  //SIGN OUT HALDLE
  // const handleSignOutAuth = () => {
  //   signOut(auth)
  //     .then(() => {
  //       setUser({});
  //     })
  // }

  //cheakbox...TOGGLE LOGIN
  const toggleLogin = e => {
    setIsLogin(e.target.checked);
    console.log(e.target.checked);
  }

  //handleNameChange
  const handleNameChange = e => {
    setName(e.target.value);

  }


  //Handle email Change
  const handleEmailChange = e => {
    // console.log(e.target.value);
    setEmail(e.target.value);
  }

  //Handle password Change
  const handlePasswordChange = e => {
    // console.log(e.target.value);
    setPassword(e.target.value);

  }

  //HANDLEREGISTRATION
  const handleRegistration = (e) => {
    e.preventDefault();
    console.log(email, Password);
    if (Password.length < 6) {
      setError('password should be at least 6 characters long');
      return;
    }
    if (!/(?=.*[A-Z].*[A-Z])/.test(Password)) {
      setError('password must contain two upper case');
      return;
    }
    // if (isLogin) {
    //   processLogin(email, Password)
    // }
    // else {
    //   registerNewUser(email, Password)
    // }
    isLogin ? processLogin(email, Password) : registerNewUser(email, Password)
  }
  // //HANDLEREGISTRATION
  // const handleRegistration = (e) => {
  //   console.log(email, Password);
  //   e.preventDefault();
  // }

  //LOG IN USER
  const processLogin = (email, Password) => {
    signInWithEmailAndPassword(auth, email, Password)
      .then(result => {
        const user = result.user;
        console.log(user);
        setError('');
      })
      .catch(error => {
        setError(error.message);

      })
  }

  //REGISTER USER
  const registerNewUser = (email, Password) => {
    createUserWithEmailAndPassword(auth, email, Password)
      .then(result => {
        const { displayName, email, photoURL } = result.user;
        const logInUser = {
          name: displayName,
          email: email,
          photo: photoURL
        };
        console.log(logInUser);
        // setUser(logInUser);
        setError('');
        varifyEmail();
        setUserName();
      })
      .catch(error => {
        setError(error.message);
      })
  }
  //set userNAME
  const setUserName = () => {
    updateProfile(auth.currentUser, { displayName: name })
      .then(result => { })
  }

  //EMAIL VARIFICATION
  const varifyEmail = () => {
    sendEmailVerification(auth.currentUser)
      .then(result => {
        console.log(result);
      })
  }

  //HANDLE RESET PASSWORD
  const handleResetPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(result => { })
  }


  return (
    <div className="mx-5">

      <br /><br />

      <form onSubmit={handleRegistration}>


        <h3 className="text-primary">Please {isLogin ? 'Login' : 'Register'}</h3>

        {!isLogin && <div className="row mb-3">
          <label htmlFor="inputName" className="col-sm-2 col-form-label">Name</label>
          <div className="col-sm-10">
            <input onBlur={handleNameChange} type="text" className="form-control" id="inputName" placeholder="your name" required />
          </div>
        </div>
        }


        <div className="row mb-3">
          <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
          <div className="col-sm-10">
            <input onBlur={handleEmailChange} type="email" className="form-control" id="inputEmail3" required />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
          <div className="col-sm-10">
            <input onBlur={handlePasswordChange} type="password" className="form-control" id="inputPassword3" required />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-sm-10 offset-sm-2">
            <div className="form-check">
              <input onChange={toggleLogin} className="form-check-input" type="checkbox" id="gridCheck1" />
              <label className="form-check-label" htmlFor="gridCheck1">
                Already Registered?
              </label>
            </div>
          </div>
        </div>
        {!error ?

          <div className="row mb-3 text-success">Email : {email} </div>

          :

          <div className="row mb-3 text-danger">{error}</div>
        }
        <button type="submit" className="btn btn-primary">{isLogin ? 'Login' : 'Register'}</button><br /><br />
        <button onClick={handleResetPassword} type="button" className="btn btn-secondary btn-sm">Reset Password</button>

      </form>





      {/* end///////////////////////////.... */}

      <br /><br /><br />
      {/* <div>-------------------------------------------------</div> */}




      <br /><br />

      {
        // !user.name ?
        //   <div>
        //     <h1>simple</h1>
        //     <h3>Please Log In With</h3>
        //     <button onClick={handleGoogleSignIn}>google Sign in</button>
        //     <button onClick={handleGithubSignIn}>GitHub Sign in</button>

        //   </div> :
        //   <div>
        //     <p>Sign Out From {user.name}</p>
        //     <button onClick={handleSignOutAuth}>Sign Out</button>
        //   </div>
      }

      {
        // user.name && <div>
        //   <h2>
        //     Welcome {user.name}
        //   </h2>
        //   <p>
        //     You have logged in with :<b> {user.email}</b>
        //   </p>
        //   <img src={user.photo} alt="" />
        // </div>
      }
    </div>
  );
}

export default App;
