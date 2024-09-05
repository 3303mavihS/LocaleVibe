import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: [],
  sessionToken: "",
  loginSession: false,
};

const loginSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCurrentUser: (state, { payload }) => {
      state.currentUser = payload;
    },
    setLoginSession: (state, { payload }) => {
      state.loginSession = payload;
    },
    setSessionToken: (state, { payload }) => {
      state.sessionToken = payload;
    },
    clearCurrentSession: (state) => {
      state.currentUser = [];
      state.sessionToken = "";
      state.loginSession = false;
    },
  },
});

export const { setCurrentUser, setLoginSession, setSessionToken } =
  loginSlice.actions;
export default loginSlice.reducer;
