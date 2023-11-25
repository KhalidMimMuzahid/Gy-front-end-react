import { createSlice } from "@reduxjs/toolkit";
import { GET_LOCALSTORAGE_DATA } from "../config";
const initialState = {
  theme: GET_LOCALSTORAGE_DATA("dark-mode"),
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    addTheme(state, action) {
      if (action.type === "THEME") {

        return state.theme = action.payload;
      }
    },
  },
});
export const { addTheme } = themeSlice.actions;
export default themeSlice.reducer;
