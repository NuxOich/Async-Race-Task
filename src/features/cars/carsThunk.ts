import { createAsyncThunk } from "@reduxjs/toolkit";
import { createCar, deleteCar, getCars, updateCar } from "../../api/carsApi";
import type { CarInput } from "../../api/types";


export const fetchCars = createAsyncThunk(
  'cars/fetchCars',
  async ({ page, limit }: { page: number; limit: number }) => {
    return await getCars(page, limit);
  }
);

export const createCarThunk = createAsyncThunk(
  'cars/createCar',
  async (car: CarInput) => {
    return await createCar(car);
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
  async (id: number) => {
    await deleteCar(id);
    return id;
  }
);

export const createManyCarsThunk = createAsyncThunk(
  'cars/createManyCars',
  async (cars: CarInput[]) => {
    const results = await Promise.allSettled(cars.map((car) => createCar(car)));
    const createdCars = results.filter((result) => result.status === 'fulfilled')
      .map((result) => result.value);
    return createdCars;
  }
);