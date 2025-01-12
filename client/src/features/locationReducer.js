/**
 * This reducer will handle the
 * location permissions
 * and share the location
 * across the application
 */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLocationPicked: false,
  pickedLocation: [0, 0],
};

const locationInfoSlice = createSlice({
  name: "locationInfo",
  initialState,
  reducers: {
    setIsLocationPicked: (state, { payload }) => {
      state.isLocationPicked = payload;
      // console.log("isLocationPicked : ", state.isLocationPicked);
    },
    setPickedLocation: (state, { payload }) => {
      state.pickedLocation = payload;
      // console.log("pickedLocation : ", state.pickedLocation);
    },
  },
});

export const { setIsLocationPicked, setPickedLocation } =
  locationInfoSlice.actions;
export default locationInfoSlice.reducer;
