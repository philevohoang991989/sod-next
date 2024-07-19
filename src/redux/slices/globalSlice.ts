import { createSlice } from "@reduxjs/toolkit";

//Create Initial State
const initialState = {
  isLoading: false,
};

//Create the slice with Reducers
const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    updateLoading: (state, action) => {
      state.isLoading = action.payload;
    },
   
  },
});

//export the reducers(actions)
export const { updateLoading } =
  globalSlice.actions;
export default globalSlice.reducer;
