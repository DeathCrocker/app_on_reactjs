import logo from './logo.svg';
import './App.css';
import Login from './login';
import React from 'react';
import Todo from './todo'

class App extends React.Component {
  state = {
    isLoggedIn: false,
    id: 0,
  };

  handleLoginClick = (param) => {
    this.setState({isLoggedIn: param})
  }

  idstatus = (param) => {
    this.setState({id: param})
  }

  render(){
  return <div className = 'App'>
  {this.state.isLoggedIn? <Todo returnpage = {this.handleLoginClick} useridin = {this.state.id} idin = {this.idstatus}/>:
   <Login handleLoginClick = {this.handleLoginClick} idout = {this.idstatus}/>}
    </div>
  
}
}

export default App;

