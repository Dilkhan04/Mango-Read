import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  access: "",
  refresh: "",
  username: "",
  image: "",
};

export const signUp = createAsyncThunk("SignUp", async (data) => {
  await axios.post("http://134.122.75.14:8666/api/auth/signup/", data, {
    headers: { "Content-type": "multipart/form-data" },
  });
});

const authSlice = createSlice({
  name: "authorization",
  initialState,
  reducers: {},
  //     extraReducers: (build) => {
  //         build
  //             .addCase(signIn.fulfilled, (state, action) => {
  //                 state.user.access = action.payload?.access;
  //                 state.user.refresh = action.payload?.refresh;
  //                 state.user.username = action.payload?.user;
  //                 state.user.image = action.payload?.image;
  //                 state.apply = action.payload?.apply;
  //             });
  //     },
});

export default authSlice.reducer;
