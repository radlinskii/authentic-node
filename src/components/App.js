import React from 'react';
import {
  BrowserRouter as Router,
  Route as Route,
  Link as Link,
} from 'react-router-dom';

import Home from './Home';
import About from './About';

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <div className='container app-component'>
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


          <Route exact path='/' component={Home}/>
          <Route exact path='/about' component={About}/>
        </div>
      </Router>
    );
  }
}

export default App;
