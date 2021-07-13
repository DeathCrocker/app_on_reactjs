import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckIcon from '@material-ui/icons/Check';



let todosh = []

export default class Todo extends React.Component{


    
    constructor(props){
        super(props);
        this.state = {newtodo: ''}
        this.handleChangelog = this.handleChangelog.bind(this);
    };

    state = {
        todoscom: []
    }


    returnPagefun = () =>{
        const {returnpage} = this.props;
        const {idin} = this.props;
        returnpage(false);
        idin(0);
    }


    handleChangelog(event) {
        this.setState({newtodo: event.target.value});
      }


    addNewTodo = (props) => {
        if (this.state.newtodo !== ''){
            todosh.push({'text': this.state.newtodo,'completed': false, 'icon': <DeleteIcon/>})
            console.log(todosh) 
            this.setState({
                todosh,
               
        })}
        else{alert('Поле пустое')}
        
    }
    

    componentDidMount = async() => {
        const {useridin} = this.props;
        
        const url = 'https://jsonplaceholder.typicode.com/todos?userId='+useridin;
        const todos = await fetch(url);
        let todoscom = await todos.json();
        console.log(todoscom);
        
        this.setState({
            todoscom

        });
        await this.sborka();
        
    };
    sborka = (state) =>{
        
        for(let i=0;i<this.state.todoscom.length;i++){
            todosh.push({'text': this.state.todoscom[i].title, 'completed': this.state.todoscom[i].completed, 'icon': <DeleteIcon/>});
       };
       this.setState({
        todosh
    })

    }
    
    clear = (state) =>{
        todosh = [];
        this.setState({
            todosh
        })
    }
    
    deleteTodo = (index) =>{
        delete todosh[index];
        this.setState({
            todosh
        })
    }

    

    

    render() {
        const buttonArray = [
            {
                text: 'Add',
                icon: '',
                onClick: this.addNewTodo,
            },
            {
                text: 'Clear',
                icon: '',
                onClick: this.clear,
            },
            {
                text: 'Exit',
                icon: '',
                onClick: this.returnPagefun,
            }
        ]
        
        return(
            <>
            <div className = 'maintodo'>
            <div><h1>TODO</h1></div>
            <input type='text' value={this.state.value} onChange={this.handleChangelog} className = 'input' ></input>
            <div>
            {buttonArray.map((button) => (
                    
                    <button className='button' onClick = {button.onClick}>{button.text}</button>
            ))}</div>
            <List className = 'widget'>
                {todosh.map((todosh, index) =>(
                    <ListItem classname = 'widget li'>
                    <ListItemText>{todosh.text}</ListItemText>
                    <ListItemIcon>{this.state.todosh[index].completed? <CheckIcon/>: <CancelIcon/>}</ListItemIcon>
                    <IconButton onClick={() => {this.deleteTodo(index);}}>{todosh.icon}</IconButton>
                    </ListItem>
                ))}
            </List> 
             
            </div>
            </>
        );

    }
}






