import { createSlice } from "@reduxjs/toolkit";

//Create Initial State
const initialState = {
  idCourse: 0,
  idClass: 0,
  idSeminar: 0,
  idVideo: 0,
  listVideoUpload:[]
};

//Create the slice with Reducers
const seminarSlice = createSlice({
  name: "seminar",
  initialState,
  reducers: {
    updateIdCourse: (state, action) => {
      state.idCourse = action.payload;
    },
    updateIdClass: (state, action) => {
      state.idClass = action.payload;
    },
    updateIdSeminar: (state, action) => {
      state.idSeminar = action.payload;
    },
    updateIdVideo: (state, action) => {
      state.idVideo = action.payload;
    },
    updateListVideoUpload: (state, action) => {
      state.listVideoUpload = action.payload;
    },
  },
});

//export the reducers(actions)
export const { updateIdCourse, updateIdClass, updateIdSeminar ,updateIdVideo,updateListVideoUpload} =
seminarSlice.actions;
export default seminarSlice.reducer;
