//   import { connect } from "react-redux";
import { userLoggedOut } from "../store/auth";
import store from "../store/configureStore";

export function getCurrentUser() {
  try {
    const currentUser = store.getState().auth;
    if (currentUser[0] === undefined) return null;
    else return currentUser[0];
  } catch (ex) {
    return null;
  }
}

export function logout() {
  store.dispatch(userLoggedOut());
}

// const mapStateToProps = (state) => {
//   return {
//     // prop name: state
//     users: state.auth,
//   };
// };

// export default connect(mapStateToProps)(getCurrentUser);
