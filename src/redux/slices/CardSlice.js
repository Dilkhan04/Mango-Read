import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const link = "https://pokeapi.co/api/v2/pokemon/";

const initialState = {
  card: {},
  isLoad: true,
};

export const getCard = createAsyncThunk("card", async (id) => {
  const { data } = await axios.get(`${link}${id}`);
  return data;
});

const cardSlice = createSlice({
  name: "cardSlice",
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build
      .addCase(getCard.pending, (state) => {
        state.isLoad = true;
      })
      .addCase(getCard.fulfilled, (state, action) => {
        state.card = action.payload;
        state.isLoad = false;
      });
  },
});

export default cardSlice.reducer;
export const cardState = (state) => state.CardSlice;
