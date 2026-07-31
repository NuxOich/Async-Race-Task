import { configureStore } from "@reduxjs/toolkit";
import carsReducer from '../features/cars/carsSlice';
import winnersReducer from '../features/winners/winnersSlice';

export const store = configureStore({
  reducer: {
    cars: carsReducer,
    winners: winnersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;