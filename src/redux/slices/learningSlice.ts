import { createSlice } from "@reduxjs/toolkit";

//Create Initial State
const initialState = {
  idVideo: 0,
  infoVideo: {},
  duration: 0,
  infoSeminar:{}
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
    updateInfoSeminar: (state, action) => {
      state.infoSeminar = action.payload;
    },
  },
});

//export the reducers(actions)
export const { updateIdVideo, updateInfoVideo, updateDuration, updateInfoSeminar } =
  learningSlice.actions;
export default learningSlice.reducer;
