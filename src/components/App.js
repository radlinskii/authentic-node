import React from 'react';
import {BrowserRouter as Router, Route, Switch,} from 'react-router-dom';

import NavigationBar from './common/NavigationBar';
import Home from './pages/Home';
import About from './pages/About';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ToDoPage from './pages/ToDoPage';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <div className='container app-component'>
          <NavigationBar/>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route path="/about" component={About}/>
            <Route path="/login" component={LoginPage}/>
            <Route path="/register" component={RegisterPage}/>
            <Route path="/todos" component={ToDoPage}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
