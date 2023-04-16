import { configureStore } from "@reduxjs/toolkit";
import CardsSlice from "./slices/CardsSlice";
import CardSlice from "./slices/CardSlice";
export const store = configureStore({
  reducer: {
    CardsSlice,
    CardSlice,
  },
});
