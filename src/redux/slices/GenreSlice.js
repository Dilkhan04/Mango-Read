import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { link } from "./CardsSlice";

const initialState = {
  type: [],
};
export const genreManga = createAsyncThunk("genre", async () => {
  const { data } = await axios.get(link + "genre/");
  return data;
});

const genreSlice = createSlice({
  name: "genreSlice",
  initialState,
  reducers: {
    setType: (state, action) => {
      state.type = action.payload;
    },
  },
  extraReducers: (build) => {
    build.addCase(genreManga.fulfilled, (state, action) => {
      state.type = action.payload;
    });
  },
});
export default genreSlice.reducer;
export const genreState = (state) => state.GenreSlice;
export const { setType } = genreSlice.actions;
