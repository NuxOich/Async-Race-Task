import { useAppDispatch, useAppSelector } from '../store/hooks';
import { carValidation } from '../utils/validation';
import { MAX_CAR_NAME_LENGTH } from '../constants';
import { createCarThunk } from '../features/cars/carsThunk';
import type { RootState } from '../store/store';
import { resetCreateForm, setCreateColor, setCreateName } from '../features/garageForm/garageFormSlice';

export const useCreateCarForm = (page: number, limit: number) => {
  const carName = useAppSelector((state: RootState) => state.garageForm.createName);
  const carColor = useAppSelector((state: RootState) => state.garageForm.createColor);
  const dispatch = useAppDispatch();

  const isNameValid = carValidation(carName, MAX_CAR_NAME_LENGTH);

  const setCarName = (name: string) => dispatch(setCreateName(name));
  const setCarColor = (color: string) => dispatch(setCreateColor(color));

  const handleCreate = () => {
    dispatch(createCarThunk({ car: { name: carName, color: carColor }, page, limit }));
    dispatch(resetCreateForm());
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