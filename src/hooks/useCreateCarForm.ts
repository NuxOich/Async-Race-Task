import { useState } from 'react';
import { useAppDispatch } from '../store/hooks';
import { carValidation } from '../utils/validation';
import { MAX_CAR_NAME_LENGTH } from '../constants';
import { createCarThunk } from '../features/cars/carsThunk';

export const useCreateCarForm = (page: number, limit: number) => {
  const [carName, setCarName] = useState<string>('');
  const [carColor, setCarColor] = useState<string>('#000000');
  const dispatch = useAppDispatch();

  const isNameValid = carValidation(carName, MAX_CAR_NAME_LENGTH);

  const handleCreate = () => {
    dispatch(
      createCarThunk({
        car: {
          name: carName,
          color: carColor,
        },
        page,
        limit,
      }),
    );
    setCarName('');
    setCarColor('#000000');
  };

  return {
    carName,
    setCarName,
    carColor,
    setCarColor,
    isNameValid,
    handleCreate,
  };
};
