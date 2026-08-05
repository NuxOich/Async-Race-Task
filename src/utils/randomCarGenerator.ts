import type { Car } from '../api/types';
import { CAR_BRANDS, CAR_MODELS, HEX_COLOR_LENGTH, HEX_COLOR_MAX, HEX_RADIX } from '../constants';

const getRandomCarName = (): string => {
  const randomBrand = CAR_BRANDS[Math.floor(Math.random() * CAR_BRANDS.length)];
  const randomModel = CAR_MODELS[Math.floor(Math.random() * CAR_MODELS.length)];
  return `${randomBrand} ${randomModel}`;
};

const getRandomColor = (): string => {
  const randomColor = Math.floor(Math.random() * HEX_COLOR_MAX).toString(HEX_RADIX);
  return `#${randomColor.padStart(HEX_COLOR_LENGTH, '0')}`;
};

export const generateRandomCar = (): Omit<Car, 'id'> => {
  const randomCarName = getRandomCarName();
  const randomCarColor = getRandomColor();

  return {
    name: randomCarName,
    color: randomCarColor,
  };
};