import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/configureStore";
import { userAdmind, userRegistered } from "./store/users";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import "./index.css";

//STORE
store.dispatch(
  userRegistered({
    username: "user1@domain.com",
    password: "123456",
    name: "Admin",
  })
);

// const d = new Date("October 13, 2022");
// console.log(d);

// const cd = d.toDateString();
// console.log(cd);

// d.setDate(d.getDate() + 5);
// console.log(d.toDateString());

store.dispatch(userAdmind({ id: 1 }));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
