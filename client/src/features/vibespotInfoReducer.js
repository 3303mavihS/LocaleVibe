/**
 * This reducer file will make some part or attributes information
 * available to other components outside of the scope
 * like attribute
 * visitedBy attribute
 */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  likes: [],
  visitedBy: [],
};

const vibespotInfoSlice = createSlice({
  name: "vibespotInfoPart",
  initialState,
  reducers: {
    //for likeslist
    setLikes: (state, { payload }) => {
      state.likes = payload;
    },

    //for visitedByList
    setVisitedBy: (state, { payload }) => {
      state.visitedBy = payload;
    },
  },
});

export const { setLikes, setVisitedBy } = vibespotInfoSlice.actions;
export default vibespotInfoSlice.reducer;
