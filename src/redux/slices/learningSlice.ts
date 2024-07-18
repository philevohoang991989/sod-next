import { createSlice } from "@reduxjs/toolkit";

//Create Initial State
const initialState = {
  idVideo: 0,
  infoVideo: {},
  duration: 0,
};

//Create the slice with Reducers
const learningSlice = createSlice({
  name: "learning",
  initialState,
  reducers: {
    updateIdVideo: (state, action) => {
      state.idVideo = action.payload;
    },
    updateInfoVideo: (state, action) => {
      state.infoVideo = action.payload;
    },
    updateDuration: (state, action) => {
      state.duration = action.payload;
    },
  },
});

//export the reducers(actions)
export const { updateIdVideo, updateInfoVideo, updateDuration } =
  learningSlice.actions;
export default learningSlice.reducer;
