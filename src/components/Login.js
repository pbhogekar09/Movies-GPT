import React, { useRef, useState } from 'react';
import Header from './Header';
import {checkValidateData} from "../utils/validate";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword,updateProfile } from "firebase/auth";
import {auth}  from "../utils/firebase";
import { LOGIN_BG, USER_LOGO } from '../utils/constants';
import { addUser } from '../utils/userSlice';

const Login = () => {

  const[isSignInForm,setIsSignInForm] = useState(true);
  const[errorMessage,setErrorMessage] = useState(null);

  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const handleButtonClick =()=>{

    const message = checkValidateData(email.current.value,password.current.value);
    setErrorMessage(message);
    if(message) return;

    if(!isSignInForm)
      {
        //sign up form
        createUserWithEmailAndPassword(auth,email.current.value,password.current.value)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value, 
            photoURL: {USER_LOGO}
          })
          .then(() => {
             const { uid, email, displayName, photoURL } = auth.currentUser;
             dispatchEvent(
              addUser({
              uid : uid,
              email : email,
              displayName : displayName,
              photoURL : photoURL
             })
            ); 
          
          }).catch((error) => {
            setErrorMessage(error.message);
          });
     })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
  });
      }
    else
      {
         // sign in form
         signInWithEmailAndPassword(auth, email.current.value,password.current.value)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
        
          // ...
  })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + errorMessage);
  });

      }
  }

  const toggleSignInForm = () =>{
      setIsSignInForm(!isSignInForm);
  }

  return (
    <div>
      <Header/>
      <div className='absolute'>
        <img className="" src={LOGIN_BG}
        alt= "BG_img"
        />
      </div>
      <form 
      onSubmit={(e)=>e.preventDefault()}
      className='absolute p-12 bg-black w-3/12 my-36 mx-auto right-0 left-0 text-white opacity-80 rounded-lg'>
        <h1 className='font-bold text-3xl py-6'>{isSignInForm? "Sign In" : "Sign Up"}</h1>
        {!isSignInForm &&
        <input
        ref={name} 
        type="text" 
        placeholder='Full Name' 
        className='m-2 p-2 w-full bg-gray-700'
        />}
        <input
        ref={email}
        type="emailId" 
        placeholder='Email address' 
        className='m-2 p-2 w-full bg-gray-700'
        />
        <input 
        ref={password}
        type="password" 
        placeholder='Password' 
        className='m-2 p-2 w-full  bg-gray-700'
        />
        <p className='text-red-500 font-medium py-2'>
        {errorMessage}
        </p>
        <button 
        onClick={handleButtonClick} 
        className='p-2 m-2 w-full bg-red-700 rounded-lg'>
        {isSignInForm? "Sign In" : "Sign Up"}
        </button>
        <p 
        className='py-4 cursor-pointer' 
        onClick={toggleSignInForm}>
        {isSignInForm?"New to MOVIES-GPT? Sign up now.":"Already registered? Sign In Now."}
        </p>
      </form>
    </div>
    )
}

export default Login