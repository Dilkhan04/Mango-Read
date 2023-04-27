import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  username: "",
  nickname: "",
  access: "",
  refresh: "",
  image: "",
  logged: false,
};

export const signIn = createAsyncThunk("SignIn", async ({ d, checked }) => {
  const { data } = await axios.post(
    "http://134.122.75.14:8666/api/auth/signin/",
    d
  );

  const finded = data !== "User not found, try again body!";

  if (finded) {
    const response = await axios.get(
      "http://134.122.75.14:8666/api/auth/profile/"
    );
    const user = response.data.find((e) => e.username === d.username);

    if (checked) {
      const local = {
        username: user.username,
        nickname: user.nickname,
        access: data.access,
        refresh: data.refresh,
        image: user.image_file,
        logged: finded,
      };
      localStorage.setItem("user", JSON.stringify(local));
    }

    return {
      ...user,
      access: data.access,
      refresh: data.refresh,
      logged: true,
    };
  }

  return { logged: false };
});

export const signUp = createAsyncThunk("SignUp", async (user) => {
  await axios.post("http://134.122.75.14:8666/api/auth/signup/", user, {
    headers: { "Content-type": "multipart/form-data" },
  });
});

export const logOut = createAsyncThunk(
  "logOut",
  async ({ access, refresh }, { dispatch }) => {
    await axios.post(
      "http://134.122.75.14:8666/api/auth/logout/",
      { refresh },
      {
        headers: {
          Authorization: "Bearer " + access,
        },
      }
    );
    dispatch(setLog());
  }
);

const authSlice = createSlice({
  name: "authorization",
  initialState,
  reducers: {
    setUser(state, action) {
      state.username = action.payload.username;
      state.nickname = action.payload.nickname;
      state.image = action.payload.image;
      state.access = action.payload.access;
      state.refresh = action.payload.refresh;
      state.logged = action.payload.logged;
    },
    setLog: (state) => {
      state.username = "";
      state.nickname = "";
      state.access = "";
      state.refresh = "";
      state.image = "";
      state.logged = false;

      localStorage.removeItem("user");
    },
  },
  extraReducers: (build) => {
    build.addCase(signIn.fulfilled, (state, action) => {
      if (action.payload?.logged) {
        state.username = action.payload.username;
        state.nickname = action.payload.nickname;
        state.image = action.payload.image_file;
        state.access = action.payload.access;
        state.refresh = action.payload.refresh;
        state.logged = action.payload.logged;
      }
    });
  },
});

export default authSlice.reducer;
export const { setUser, setLog } = authSlice.actions;
export const authState = (state) => state.AuthAndRegSlice;
