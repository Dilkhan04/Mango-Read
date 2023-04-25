import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const link = "http://134.122.75.14:8666/api/v1/";

const initialState = {
  cards: [],
  isLoad: true,
  offset: 0,
  scann: [],
  comments: [],
};

export const getCards = createAsyncThunk("cards/anime", async (params) => {
  const { data } = await axios.get(link + "top-manga", { params: params });
  return data;
});
export const getComments = createAsyncThunk("comments", async (id) => {
  const { data } = await axios.get(link + "manga/" + id + "/comments/");
  return data.reverse();
});

export const getScanning = createAsyncThunk('scan', async (scan) => {
  const {data} = await axios.get(link+'manga/?search='+scan)
  if(scan.length === ''){
    return []
  }else{
    return data
  }
})

// export const addComment = createAsyncThunk(
//   "addCommentsUser",
//   async ({ id, text, access }) => {
//     await axios.post(
//       link + "manga/" + id + "/add-comment/",
//       { text: text },
//       {
//         headers: {
//           Authorization: "Bearer " + access,
//         }, 
//       }
//     );
//   }
// );
const cardsSlice = createSlice({
  name: "cardsSlice",
  initialState,
  reducers: {
    setOffset: (state, action) => {
      state.offset = action.payload;
    },
    setScann: (state, action) => {
      state.scann = action.payload
    }
  },
  extraReducers: (build) => {
    build
      .addCase(getCards.pending, (state) => {
        state.isLoad = true;
      })
      .addCase(getCards.fulfilled, (state, action) => {
        state.cards = action.payload;
        state.isLoad = false;
      })
      .addCase(getComments.pending, (state) => {
        state.isLoad = true;
      })
      .addCase(getComments.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.isLoad = false;
      })
      .addCase(getScanning.fulfilled, (state, action) => {
        state.scann = action.payload
      })
  },
});

export default cardsSlice.reducer;
export const { setOffset, setScann } = cardsSlice.actions;
export const cardsSelect = (state) => state?.CardsSlice;
