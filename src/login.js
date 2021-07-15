import React from "react";
import "./login.css";
import "./App.css";

const url = "https://jsonplaceholder.typicode.com/users";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "" };
    this.state = { password: "" };
    this.state = { isloginsuccsess: true };
    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
  }

  state = {
    users: [],
  };

  componentDidMount = async () => {
    const usersfrom = await fetch(url);
    let users = await usersfrom.json();
    this.setState({
      users,
    });
  };

  handleChangeUsername(event) {
    this.setState({ username: event.target.value });
  }
  handleChangePassword(event) {
    this.setState({ password: event.target.value });
  }

  errorSuccess = (state, props) => {
    this.setState({
      isloginsuccsess: false,
    });
  };

  isLoginSuccessful = (props, state) => {
    const { handleLoginClick } = this.props;
    const { userid } = this.props;
    let succes = false;

    for (let i = 0; i < this.state.users.length; i++) {
      if (
        this.state.username == this.state.users[i].username &&
        this.state.password == this.state.users[i].website
      ) {
        handleLoginClick(true);
        let id = this.state.users[i].id;
        userid(id);
        succes = true;
      }
    }
    if (succes == false) {
      this.errorSuccess();
    }
  };

  render() {
    return (
      <>
        <div className="loginform">
          <div className="login">
            <h1>Login</h1>
          </div>
          <input
            type="text"
            value={this.state.username}
            onChange={this.handleChangeUsername}
          ></input>
          <div className="login">
            <h1>Password</h1>
          </div>
          <input
            type="password"
            value={this.state.password}
            onChange={this.handleChangePassword}
          ></input>
          <div>
            <button onClick={this.isLoginSuccessful}>Continue</button>
          </div>
          <div
            className={
              this.state.isloginsuccsess ? "successtrue" : "successfalse"
            }
          >
            Неправильный логин или пароль
          </div>
        </div>
      </>
    );
  }
}
