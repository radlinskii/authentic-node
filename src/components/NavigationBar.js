import React from 'react';
import { Link, } from 'react-router-dom';

const NavigationBar = () => {

  return (
    <nav className='navbar navbar-inverse'>
      <div>
        <div className='navbar-header'>
          <Link className='navbar-brand' to='/'>Authentic React</Link>
        </div>
        <ul className='nav navbar-nav'>
          <li><Link to='/'><span className='fas fa-home'>&nbsp;</span>Home</Link></li>
          <li><Link to='/about'><span className='fas fa-info-circle'>&nbsp;</span>About</Link></li>
        </ul>
        <ul className='nav navbar-nav navbar-right'>
          <li><Link to='/login'><span className='fas fa-sign-in-alt'>&nbsp;</span>Login</Link></li>
          <li><Link to='/register'><span className='fas fa-user-plus'>&nbsp;</span>Register</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default NavigationBar;
