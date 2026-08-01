import { createSlice } from "@reduxjs/toolkit";
import { MOCK_CARS } from "../../constants";
import { type RootState } from "../../store/store";
import type { Car } from "../../api/types";
import { createCarThunk, createManyCarsThunk, deleteCarThunk, fetchCars, updateCarThunk } from "./carsThunk";


const initialState: CarsState = {
  items: MOCK_CARS,
  totalCount: MOCK_CARS.length,
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
      .addCase(fetchCars.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = action.payload.items;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message ?? 'Unknown error';
      })
      .addCase(createCarThunk.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createCarThunk.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items.push(action.payload);
        state.totalCount += 1;
      })
      .addCase(createCarThunk.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message ?? 'Unknown error';
      })
      .addCase(updateCarThunk.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateCarThunk.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.items.findIndex((car) => car.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateCarThunk.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message ?? 'Unknown error';
      })
      .addCase(deleteCarThunk.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(deleteCarThunk.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.items.findIndex((car) => car.id === action.payload);
        if (index !== -1) {
          state.items.splice(index, 1);
          state.totalCount -= 1;
        }
      })
      .addCase(deleteCarThunk.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message ?? 'Unknown error';
      })
      .addCase(createManyCarsThunk.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createManyCarsThunk.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items.push(...action.payload);
        state.totalCount += action.payload.length;
      })
  }
});

export const selectAllCars = (state: RootState) => state.cars.items;
export const selectCarsTotalCount = (state: RootState) => state.cars.totalCount;
export const selectCarById = (id: number) => (state: RootState) =>
  state.cars.items.find((car) => car.id === id);


export default carsSlice.reducer;