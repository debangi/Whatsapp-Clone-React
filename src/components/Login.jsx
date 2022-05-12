import { Button } from '@mui/material';
import { signInWithPopup } from 'firebase/auth';
import React, { useContext } from 'react';
import { auth, googleProvider } from '../firebase-config';
import { StateContext } from '../StateProvider';

import './Login.css';

const Login = () => {
  const { user, addCurrentUser, removeCurrentUser } = useContext(StateContext);

  console.log(user);
  googleProvider.setCustomParameters({
    prompt: 'select_account',
  });
  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider);
    addCurrentUser(auth.currentUser);
  };

  return (
    <div className='login'>
      <div className='login__container'>
        <img
          src='https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg'
          alt='logo'
        />
        <div className='login__text'>
          <h1>Sign In to Whatsapp</h1>
        </div>
        <Button onClick={signInWithGoogle}>Sign In With Google</Button>
      </div>
    </div>
  );
};

export default Login;
