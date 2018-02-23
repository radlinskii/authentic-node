import React from 'react';
import { BrowserRouter, Route, } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';
import NavigationBar from './pages/NavigationBar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BrowserRouter>
        <div className='container app-component'>
          <NavigationBar/>

          <Route exact path='/' component={Home}/>
          <Route path='/about' component={About}/>
          <Route exact path='/login' component={LoginPage}/>
          <Route exact path='/register' component={RegisterPage}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
