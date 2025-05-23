import React from 'react';
import { signOut } from "firebase/auth";
import {auth} from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from 'react-redux';
import {addUser, removeUser} from '../utils/userSlice';
import { useEffect } from 'react';
import { WEBSITE_LOGO, USER_LOGO } from '../utils/constants';

const Header = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  const handleSignOut = () =>{
        signOut(auth).then(() => {
          }).catch((error) => {
          navigate("/error");
        });
      }

      useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            const {uid,email,displayName} = user;
            dispatch(
              addUser({
                uid: uid,
                email: email,
                displayName: displayName
              })
            );
            navigate("/browse");
          } 
          else {
            dispatch(removeUser());
            navigate("/");
          }
        });
        //unsubscribe when component unmounts
        return () => unsubscribe();
      },[])

  return (
    <div className='absolute w-screen px-9 bg-gradient-to-b from-black z-10 flex justify-between'>
      <img className="w-80" src={WEBSITE_LOGO}
      alt= "logo"
      />
    {user &&(
    <div className='relative text-white font-bold'>
    <img className="pt-3 w-12 h-16" src= {USER_LOGO}
      alt= "logo"
      />
      <button onClick={handleSignOut}>(Sign Out)</button>
    </div>)}
   </div>
   
  )
}

export default Header