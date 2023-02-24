import React from 'react'
import '../styles/Navbar.scss';
import Temple from '../assets/temple.svg';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  function navigateToLogin(e) {
    e.preventDefault();

    navigate('/');
  }

  function navigateToSignup(e) {
    e.preventDefault();

    navigate('/signup');
  }

  return (
    <div className='navbar'>
      <ul>
        <li className='logo'>
          <img src={Temple} alt='axp logo' />
          <div className='axp'>AXP Management</div>
        </li>
        <li onClick={navigateToLogin}>Login</li>
        <li onClick={navigateToSignup}>Signup</li>
      </ul>
    </div>
  );
}

export default Navbar