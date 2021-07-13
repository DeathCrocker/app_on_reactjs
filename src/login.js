
import React from 'react';
import './login.css';
import './App.css'


const url = 'https://jsonplaceholder.typicode.com/users';

export default class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {value: ''}
        this.state = {valuepas: ''}
        this.handleChangelog = this.handleChangelog.bind(this);
        this.handleChange = this.handleChange.bind(this);
    };

    state = {
        usersout: [],
        

    };
    
    
   

    componentDidMount = async() => {
        const users = await fetch(url)
        let usersout = await users.json()
        this.setState({
            usersout

        });
    };
    

    handleChangelog(event) {
        this.setState({value: event.target.value});
      }
    handleChange(event) {
        this.setState({valuepas: event.target.value});
      }
      
    


    loginsuc = (props) =>{
        
        const {handleLoginClick} = this.props;
        const {idout} = this.props;
        let suc = false;
        for(let i=0;i<this.state.usersout.length;i++){
            if(this.state.value == this.state.usersout[i].username &&
                 this.state.valuepas == this.state.usersout[i].website){
                handleLoginClick(true);
                let id  =this.state.usersout[i].id;
                idout(id);
                suc = true;
                
                
            } 
        };
        if(suc == false){alert('Неправильный логин или пароль')}
        
    };
    

    render() {
        
        
        

        return(
            <>
            <div className = 'login'><h1>Login</h1></div>
            <input type = 'text' value={this.state.value} onChange={this.handleChangelog} ></input>
            <div className = 'login'><h1>Password</h1></div>
            <input type = 'password' value={this.state.valuepas} onChange={this.handleChange}></input>
            <div><button onClick = {this.loginsuc}>Войти</button></div></>
        );

    }
}

