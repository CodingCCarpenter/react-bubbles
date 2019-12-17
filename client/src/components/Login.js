import React from "react";
import useForm from 'react-hook-form';

import axiosWithAuth from '../auth/axiosWithAuth';

const Login = (props) => {
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    axiosWithAuth()
      // make a post request to retrieve a token from the api
      .post('/login', data)
      .then((res) => {
        localStorage.setItem('token', res.data.payload);
        props.history.push('/dash')
      })
      .catch((err) => {
        console.log(
          'src/components/Login.js: onSubmit: axiosWithAuth: .catch ERROR: ', 
          err
        )
      });
      // when you have handled the token, navigate to the BubblePage route
  }
  
  return (
    <div className = 'loginPage'>
      <h1>Welcome to the Bubble App!</h1>
      {/* <p>Build a login page here</p> */}
      <form className='loginForm' onSubmit={ handleSubmit(onSubmit) }>
        <label for='username'>
          Username: 
        </label>
        <input type='text' name='username' id='username' ref={ register } />
        <br/>

        <label for='password'>
          Password: 
        </label>
        <input type='password' name='password' id='password' ref={ register } />
        <br/>
        
        <input type='submit' value='Log In' className='submit' />
      </form>

    </div>
  );
};

export default Login;
