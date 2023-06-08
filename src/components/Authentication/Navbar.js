import React from 'react';
import '../../styles/Navbar.css';
import AXP from '../../assets/AXP.svg';
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
      <div className='navbarElement'>
        <img src={AXP} className='logo' alt='axp logo' />
      </div>
      <div className='navbarElement' onClick={navigateToLogin}>
        Login
      </div>
      <div className='navbarElement' onClick={navigateToSignup}>
        Signup
      </div>
    </div>
  );
}

export default Navbar;
