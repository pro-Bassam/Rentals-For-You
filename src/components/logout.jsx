import { Component } from "react";
import { logout } from "../services/authService";

class Logout extends Component {
  componentDidMount() {
    logout();
    this.props.history.push("/");
    // window.location = "/";
  }
  render() {
    return null;
  }
}

export default Logout;
