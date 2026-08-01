import type { Car } from "../api/types";
import { CAR_BRANDS, CAR_MODELS } from "../constants";



const getRandomCarName = (): string => {
  const randomBrand = CAR_BRANDS[Math.floor(Math.random() * CAR_BRANDS.length)];
  const randomModel = CAR_MODELS[Math.floor(Math.random() * CAR_MODELS.length)]
  return `${randomBrand} ${randomModel}`;
};

const getRandomColor = (): string => {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return `#${randomColor.padStart(6, '0')}`;
};

export const generateRandomCar = (): Omit<Car, 'id'> => {
  const randomCarName = getRandomCarName();
  const randomCarColor = getRandomColor();

  return {
    name: randomCarName,
    color: randomCarColor,
  };
};