import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
// import Welcome from './components/pages/Welcome';
import Registration from './components/pages/Registration'
import Login from './components/Login'
import Threads from './components/pages/Threads';

class App extends Component {
  render() {
    return (
        <Router>
            <Switch>
              <Route exact path="/threads" component={Threads}></Route>
                <Route exact path="/" component={Threads}></Route>
                <Route exact path="/welcome" component={Login}></Route>
                <Route exact path="/register" component={Registration}></Route>
                <Route path="*" component={()=>{
                    return "404 Page Not Found"
                }}></Route>
            </Switch>
        </Router>
    );
  }
}
export default App;