import { configureStore } from "@reduxjs/toolkit";
import sidebarSlice from "./Actions/sidebarSlice";

const Store = configureStore({
  reducer: {
    sidebar: sidebarSlice.reducer,
  },
});

export default Store;
