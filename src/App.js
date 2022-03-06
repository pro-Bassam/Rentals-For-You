// import logo from "./logo.svg";
import React, { Fragment, useEffect, useState } from "react";
import { Route, Redirect, Switch } from "react-router-dom";

import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import NavBar from "./components/navBar";
import LoginForm from "./components/loginForm";
import Logout from "./components/logout";
import RegisterForm from "./components/registerForm";
import { getCurrentUser } from "./services/authService";

import "./App.css";
import RentalForm from "./components/rentalForm";

function App() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const user = getCurrentUser();
    setUser(user);
  });

  return (
    <Fragment>
      <NavBar user={user} />
      <main className="container">
        <Switch>
          <Route path="/register" component={RegisterForm} />
          <Route path="/login" component={LoginForm} />
          <Route path="/logout" component={Logout} />
          <Route path="/movies/:id" component={RentalForm} />
          <Route
            path="/rentals"
            render={(props) => <Rentals {...props} user={user} />}
          />
          <Route path="/rentals" component={Rentals} />

          <Route path="/not-found" component={NotFound} />
          <Redirect from="/" exact to="/rentals" />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    </Fragment>
  );
}

export default App;
