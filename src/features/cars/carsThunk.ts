import { createAsyncThunk } from "@reduxjs/toolkit";
import { createCar, deleteCar, getCars, updateCar } from "../../api/carsApi";
import type { CarInput } from "../../api/types";
import type { RootState } from "../../store/store";


export const fetchCars = createAsyncThunk(
  'cars/fetchCars',
  async ({ page, limit }: { page: number; limit: number }) => {
    return await getCars(page, limit);
  }
);

export const createCarThunk = createAsyncThunk(
  'cars/createCar',
  async ({ car, page, limit }: { car: CarInput, page: number, limit: number }, { dispatch }) => {
    await createCar(car);

    await dispatch(fetchCars({ page, limit }));
  }
);

export const updateCarThunk = createAsyncThunk(
  'cars/updateCar',
  async ({ id, car }: { id: number, car: CarInput }) => {
    return await updateCar(id, car);
  }
);

export const deleteCarThunk = createAsyncThunk(
  'cars/deleteCar',
  async ({ id, page, limit }: { id: number, page: number, limit: number }, { dispatch, getState }) => {
    await deleteCar(id);

    const state = getState() as RootState;
    const items = state.cars.items;

    const isLastItemOnPage = items.length === 1;
    const targetPage = isLastItemOnPage && page > 1 ? page - 1 : page;

    await dispatch(fetchCars({ page: targetPage, limit }));
  }
);

export const createManyCarsThunk = createAsyncThunk(
  'cars/createManyCars',
  async ({ cars, page, limit }: { cars: CarInput[], page: number, limit: number }, { dispatch }) => {
    const results = await Promise.allSettled(cars.map((car) => createCar(car)));
    const createdCars = results.filter((result) => result.status === 'fulfilled')
      .map((result) => result.value);

    await dispatch(fetchCars({ page, limit }));
    return createdCars;
  }
);