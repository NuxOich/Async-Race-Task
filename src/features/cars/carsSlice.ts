import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { MOCK_CARS } from "../../constants";
import { type Car } from "../../constants";
import { type RootState } from "../../store/store";


interface CarsState {
  items: Car[];
  totalCount: number;
}

const initialState: CarsState = {
  items: MOCK_CARS,
  totalCount: MOCK_CARS.length,
};

const carsSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    createCar: (state, action: PayloadAction<Omit<Car, 'id'>>) => {
      const newId = state.items.length > 0 ? Math.max(...state.items.map((c) => c.id)) + 1 : 1;
      state.items.push({ ...action.payload, id: newId });
      state.totalCount += 1;
    },
    createManyCars: (state, action: PayloadAction<Omit<Car, 'id'>[]>) => {
      let nextId = state.items.length > 0 ? Math.max(...state.items.map((c) => c.id)) + 1 : 1;
      action.payload.forEach((car) => {
        state.items.push({ ...car, id: nextId });
        nextId += 1;
      });
      state.totalCount += action.payload.length;
    },
    deleteCar: (state, action: PayloadAction<number>) => {
      const index = state.items.findIndex((car) => car.id === action.payload);
      if (index !== -1) {
        state.items.splice(index, 1);
        state.totalCount -= 1;
      }
    },
    updateCar: (state, action: PayloadAction<Car>) => {
      const index = state.items.findIndex((car) => car.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
  },
});

export const selectAllCars = (state: RootState) => state.cars.items;
export const selectCarsTotalCount = (state: RootState) => state.cars.totalCount;
export const selectCarById = (id: number) => (state: RootState) =>
  state.cars.items.find((car) => car.id === id);


export const { createCar, createManyCars, deleteCar, updateCar } = carsSlice.actions;
export default carsSlice.reducer;