import React from 'react';
import '../styles/Login.scss';
import Navbar from './Navbar';

function Login() {
  return (
    <div className='loginContainer'>
      <Navbar />
      <form className='login'>
        <h2 className='pageTitle'>Log in</h2>
        <label>
          <div>first name:</div>
          <input type='text'></input>
        </label>
        <label>
          <div>last name:</div>
          <input type='text'></input>
        </label>
        <label>
          <div>email:</div>
          <input type='email'></input>
        </label>
        <label>
          <div>password:</div>
          <input type='password'></input>
        </label>
        <button className='btn'>Log in</button>
      </form>
    </div>
  );
}

export default Login