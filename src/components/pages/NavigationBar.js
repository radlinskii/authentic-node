import React from 'react';
import { Link, } from 'react-router-dom';

const NavigationBar = () => {

  return (
    <nav className='navbar navbar-inverse'>
      <div>
        <div className='navbar-header'>
          <Link className='navbar-brand' to='/'>Spider-Flower</Link>
        </div>
        <ul className='nav navbar-nav'>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/about'>About</Link></li>
        </ul>
        <ul className='nav navbar-nav navbar-right'>
          <li><Link to='/login'><span className='fa fa-sign-in'>&nbsp;</span>Login</Link></li>
          <li><Link to='/register'><span className='fa fa-user-plus'>&nbsp;</span>Register</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default NavigationBar;
