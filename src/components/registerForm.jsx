import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { connect } from "react-redux";
import { userRegistered } from "../store/users";

class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", name: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().email().label("Username"),
    password: Joi.string().required().min(5).label("Password"),
    name: Joi.string().required().label("Name"),
  };

  doSubmit = () => {
    try {
      const { username, password, name } = this.state.data;
      // Call the server
      this.props.onUserRegistered(username, password, name);
      this.props.history.push("/login");
    } catch (ex) {
      console.log("registration faild", ex.response.data);
      const errors = { ...this.state.errors };
      errors.username = "User already registered.";
      this.setState({ errors });
    }
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // props name: function when executed it despatch
    onUserRegistered: (username, password, name) => {
      dispatch({
        type: userRegistered.type,
        payload: { username, password, name },
      });
    },
  };
};

export default connect(null, mapDispatchToProps)(RegisterForm);
