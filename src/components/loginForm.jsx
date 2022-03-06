import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { connect } from "react-redux";
import { userAuthenticated } from "../store/auth";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = () => {
    try {
      const { username, password } = this.state.data;
      const users = this.props.users;
      const index = users.findIndex(
        (user) => user.username === username && user.password === password
      );
      if (index >= 0) {
        this.props.onUserAuth(
          users[index].username,
          users[index].password,
          users[index].name,
          users[index].isAdmin
        );

        // to redirect the user to the previous place
        // or to go to /movie
        const { state } = this.props.location;
        if (state) window.location = state;
        else this.props.history.push("/");
      } else {
        console.log("invaled username or password");
        const errors = { ...this.state.errors };
        errors.username = "Invalid email or password.";
        this.setState({ errors });
      }
    } catch (ex) {
      console.log("login faild", ex.response.data);
    }
  };

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // prop name: state
    users: state.entities.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // props name: function when executed it despatch
    onUserAuth: (username, password, name, isAdmin) => {
      dispatch({
        type: userAuthenticated.type,
        payload: { username, password, name, isAdmin },
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
