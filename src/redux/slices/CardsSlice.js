import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const link = "https://pokeapi.co/api/v2/pokemon/";

const initialState = {
  cards: [],
  isLoad: true,
  offset: 0,
};

export const getCards = createAsyncThunk("cards/anime", async (params) => {
  const { data } = await axios.get(link, { params: params });
  console.log(data);
  return data;
});

const cardsSlice = createSlice({
  name: "cardsSlice",
  initialState,
  reducers: {
    setOffset: (state, action) => {
      state.offset = action.payload;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(getCards.pending, (state) => {
        state.isLoad = true;
      })
      .addCase(getCards.fulfilled, (state, action) => {
        state.cards = action.payload;
        state.isLoad = false;
      });
  },
});

export default cardsSlice.reducer;
export const { setOffset } = cardsSlice.actions;
export const cardsSelect = (state) => state?.CardsSlice;
