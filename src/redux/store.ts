import { configureStore } from "@reduxjs/toolkit";
import seminarSlice from "./slices/seminarSlice";

//create a store and give it reducers


export const makeStore = () => {
  return configureStore({
    reducer: {
      seminar: seminarSlice,
    }
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']