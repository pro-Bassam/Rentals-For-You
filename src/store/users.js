import { createSlice } from "@reduxjs/toolkit";
let lastID = 0;

const slice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    // actions => action handlers
    userRegistered: (users, action) => {
      users.push({
        id: ++lastID,
        username: action.payload.username,
        password: action.payload.password,
        name: action.payload.name,
        isAdmin: false,
      });
    },

    userAdmind: (users, action) => {
      const index = users.findIndex((user) => user.id === action.payload.id);
      users[index].isAdmin = true;
    },
  },
});

export const { userRegistered, userAdmind } = slice.actions;
export default slice.reducer;
