import React from 'react';
import {BrowserRouter as Router, Route, Switch,} from 'react-router-dom';

import NavigationBar from './common/NavigationBar';
import Home from './home/Home';
import About from './about/About';
import LoginPage from './login/LoginPage';
import RegisterPage from './register/RegisterPage';
import ToDosPage from './todos/ToDosPage';
import UserPage from './users/UserPage';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <div className='container AppComponent'>
          <NavigationBar/>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route path="/about" component={About}/>
            <Route path="/login" component={LoginPage}/>
            <Route path="/register" component={RegisterPage}/>
            <Route path="/todos" component={ToDosPage}/>
            <Route path="/profile" component={UserPage}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
