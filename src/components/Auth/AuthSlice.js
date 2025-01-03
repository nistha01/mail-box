import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: false,
  isUser: false,
  gmail: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin(state, action) {
      state.isLogin = action.payload;
    },
    setUser(state, action) {
      state.isUser = action.payload;
    },
    setGmail(state, action) {
      state.gmail = action.payload;
    },
  },
});

export const { setLogin, setUser, setGmail,isLogin,gmail } = authSlice.actions;
export default authSlice.reducer;