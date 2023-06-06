import React from 'react';
import Navbar from './Navbar';
import '../../styles/Login.scss';
import Select from 'react-select';
import useSignupForm from '../../hooks/useSignupForm';

function Signup() {
  const {
    role,
    options,
    formData,
    handleInputChange,
    handleRoleChange,
    handleSubmit,
  } = useSignupForm();

  return (
    <div className='loginContainer'>
      <Navbar />
      <form className='login' onSubmit={handleSubmit}>
        <h2 className='pageTitle'>Sign up</h2>
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
          <div>first name:</div>
          <input
            type='text'
            name='firstName'
            value={formData.firstName}
            onChange={handleInputChange}
          ></input>
        </label>
        <label>
          <div>last name:</div>
          <input
            type='text'
            name='lastName'
            value={formData.lastName}
            onChange={handleInputChange}
          ></input>
        </label>
        <label></label>
        <label>
          <div>email:</div>
          <input
            type='email'
            name='email'
            value={formData.email}
            onChange={handleInputChange}
          ></input>
        </label>
        <label className='selectMargin'>
          <Select
            options={options}
            value={role}
            onChange={handleRoleChange}
          ></Select>
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
        <button className='btn' type='submit'>
          Sign up
        </button>
      </form>
    </div>
  );
}

export default Signup;
