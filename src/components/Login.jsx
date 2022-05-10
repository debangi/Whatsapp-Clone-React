import { Button } from '@mui/material';
import React from 'react';

import './Login.css';

const Login = () => {
  const signIn = () => {};
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
        <Button onClick={signIn}>Sign In With Google</Button>
      </div>
    </div>
  );
};

export default Login;
