import React from 'react';
import '../../styles/Login.css';
import Navbar from './Navbar';
import useLoginForm from '../../hooks/useLoginForm';

function Login() {
  const { formData, handleInputChange, handleSubmit, error } = useLoginForm();

  return (
    <div className='loginContainer'>
      <Navbar />
      <form className='login' onSubmit={handleSubmit}>
        <h2 className='pageTitle'>Log in</h2>
        <label>
          <div>username:</div>
          <input
            type='text'
            name='username'
            value={formData.username}
            onChange={handleInputChange}
          ></input>
        </label>
        <label>
          <div>password:</div>
          <input
            type='password'
            name='password'
            value={formData.password}
            onChange={handleInputChange}
          ></input>
        </label>
        <button className='btn'>Log in</button>
        {error && <div style={{color: 'red'}}>Wrong username or password</div>}
      </form>
    </div>
  );
}

export default Login;
