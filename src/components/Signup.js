import React from 'react'
import Navbar from './Navbar'
import '../styles/Login.scss';

function Signup() {
  return (
    <div className='loginContainer'>
      <Navbar />
      <form className='login'>
        <h2 className='pageTitle'>Sign up</h2>
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
        <button className='btn'>Sign up</button>
      </form>
    </div>
  );
}

export default Signup