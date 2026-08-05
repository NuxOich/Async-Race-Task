import { configureStore } from '@reduxjs/toolkit';
import carsReducer from '../features/cars/carsSlice';
import winnersReducer from '../features/winners/winnersSlice';
import raceReducer from '../features/race/raceSlice';
import garageFormReducer from '../features/garageForm/garageFormSlice';

export const store = configureStore({
  reducer: {
    cars: carsReducer,
    winners: winnersReducer,
    race: raceReducer,
    garageForm: garageFormReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
