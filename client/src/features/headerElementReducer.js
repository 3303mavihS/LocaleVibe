import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  visibleRightSideBar: true,
};

const headerComponentSlice = createSlice({
  name: "header",
  initialState,
  reducers: {
    setVisibleRightSideBar: (state, { payload }) => {
      state.visibleRightSideBar = payload;
    },
  },
});

export const { setVisibleRightSideBar } = headerComponentSlice.actions;
export default headerComponentSlice.reducer;
