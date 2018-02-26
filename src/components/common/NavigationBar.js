import React from 'react';
import { Link, } from 'react-router-dom';

const NavigationBar = () => {

  return (
    <nav className='navbar navbar-inverse'>
      <div>
        <div className='navbar-header'>
          <Link className='navbar-brand' to='/'>
            <span className='fab fa-react'>&nbsp;</span>Authentic React</Link>
        </div>
        <ul className='nav navbar-nav'>
          <li><Link to='/about' activeclassname='active'><span className='fa fa-info-circle'>&nbsp;</span>About</Link></li>
          <li><Link to='/profile' activeclassname='active'><span className='fas fa-user'>&nbsp;</span>Profile</Link></li>
          <li><Link to='/todos' activeclassname='active'><span className='fas fa-tasks'>&nbsp;</span>ToDos</Link></li>
        </ul>
        <ul className='nav navbar-nav navbar-right'>
          <li><Link to='/login' activeclassname='active'><span className='fas fa-sign-in-alt'>&nbsp;</span>Login</Link></li>
          <li><Link to='/register' activeclassname='active'><span className='fas fa-user-plus'>&nbsp;</span>Register</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default NavigationBar;
