import { createSlice } from "@reduxjs/toolkit";

//Create Initial State
const initialState = {
  idCourse: 0,
  idClass: 0,
  idSeminar: 0,
};

//Create the slice with Reducers
const seminarSlice = createSlice({
  name: "cart",
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
  },
});

//export the reducers(actions)
export const { updateIdCourse, updateIdClass, updateIdSeminar } =
seminarSlice.actions;
export default seminarSlice.reducer;
