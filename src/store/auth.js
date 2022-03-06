import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "auth",
  initialState: [],
  reducers: {
    // actions => action handlers
    userAuthenticated: (users, action) => {
      users.splice(0, users.length);
      users.push({
        username: action.payload.username,
        password: action.payload.password,
        name: action.payload.name,
        isAdmin: action.payload.isAdmin,
      });
    },

    userLoggedOut: (users, action) => {
      users.splice(0, users.length);
    },
  },
});

export const { userAuthenticated, userLoggedOut } = slice.actions;
export default slice.reducer;
