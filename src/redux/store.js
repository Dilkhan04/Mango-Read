import { configureStore } from "@reduxjs/toolkit";
import CardsSlice from "./slices/CardsSlice";
import CardSlice from "./slices/CardSlice";
import GenreSlice from "./slices/GenreSlice";
import AuthAndRegSlice from "./slices/AuthAndRegSlice";
export const store = configureStore({
  reducer: {
    CardsSlice,
    CardSlice,
    GenreSlice,
    AuthAndRegSlice,
  },
});
