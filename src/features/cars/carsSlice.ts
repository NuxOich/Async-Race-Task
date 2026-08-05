import { createSlice } from '@reduxjs/toolkit';
import { type RootState } from '../../store/store';
import type { Car } from '../../api/types';
import {
  createCarThunk,
  createManyCarsThunk,
  deleteCarThunk,
  fetchCars,
  updateCarThunk,
} from './carsThunk';
import { isAnyOf } from '@reduxjs/toolkit';

const carsPendingActions = isAnyOf(
  fetchCars.pending,
  createCarThunk.pending,
  updateCarThunk.pending,
  deleteCarThunk.pending,
  createManyCarsThunk.pending,
);

const carsRejectedActions = isAnyOf(
  fetchCars.rejected,
  createCarThunk.rejected,
  updateCarThunk.rejected,
  deleteCarThunk.rejected,
  createManyCarsThunk.rejected,
);

const initialState: CarsState = {
  items: [],
  totalCount: 0,
  status: 'idle',
  error: null,
};

interface CarsState {
  items: Car[];
  totalCount: number;
  status: 'idle' | 'loading' | 'error';
  error: string | null;
}

const carsSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = action.payload.items;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(createCarThunk.fulfilled, (state) => {
        state.status = 'idle';
      })
      .addCase(updateCarThunk.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.items.findIndex(
          (car) => car.id === action.payload.id,
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteCarThunk.fulfilled, (state) => {
        state.status = 'idle';
      })
      .addCase(createManyCarsThunk.fulfilled, (state) => {
        state.status = 'idle';
      })
      .addMatcher(carsPendingActions, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addMatcher(carsRejectedActions, (state, action) => {
        state.status = 'error';
        state.error = action.error?.message ?? 'Unknown error';
      });
  },
});

export const selectAllCars = (state: RootState) => state.cars.items;
export const selectCarsTotalCount = (state: RootState) => state.cars.totalCount;
export const selectCarById = (id: number) => (state: RootState) =>
  state.cars.items.find((car) => car.id === id);

export default carsSlice.reducer;
