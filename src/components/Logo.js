import React from 'react';
import AXP from '../assets/AXP.svg';
import '../styles/Logo.css';

function Logo(props) {
  const { paddingLeft } = props;
  const styleWithPadding = {
    paddingLeft: `${paddingLeft}px`,
  };

  return (
    <div className='navbarElement' style={styleWithPadding}>
      <img src={AXP} className='logo' alt='axp logo' />
    </div>
  );
}

export default Logo;
