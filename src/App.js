import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Signup from './components/Signup'
import Login from './components/Login'
import Home from './components/Home'
import Edit from './components/Edit'

class App extends React.Component{
  render(){
    return(
      <Router>
        <Switch>
          <Route exact path="/" component={Signup}/>
          <Route exact path="/signin" component={Login}/>
          <Route exact path="/signup" component={Signup}/>
          <Route exact path="/home" component={Home}/>   
          <Route exact path="/edit/:_id" component={Edit}/>   
        </Switch>
      </Router>
    )
  }
}

export default App;
