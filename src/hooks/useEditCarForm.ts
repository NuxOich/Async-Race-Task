import { useAppDispatch, useAppSelector } from '../store/hooks';
import { carValidation } from '../utils/validation';
import { MAX_CAR_NAME_LENGTH } from '../constants';
import { updateCarThunk } from '../features/cars/carsThunk';
import type { Car } from '../api/types';
import type { RootState } from '../store/store';
import { resetEditForm, setEditColor, setEditName, startEditingCar } from '../features/garageForm/garageFormSlice';

export const useEditCarForm = () => {
  const editingCarId = useAppSelector((state: RootState) => state.garageForm.editingCarId);
  const editCarName = useAppSelector((state: RootState) => state.garageForm.editName);
  const editCarColor = useAppSelector((state: RootState) => state.garageForm.editColor);
  const dispatch = useAppDispatch();

  const isEditNameValid = carValidation(editCarName, MAX_CAR_NAME_LENGTH);

  const setEditCarName = (name: string) => dispatch(setEditName(name));
  const setEditCarColor = (color: string) => dispatch(setEditColor(color));

  const startEditing = (car: Car) => {
    dispatch(startEditingCar({ id: car.id, name: car.name, color: car.color }));
  };

  const handleEdit = () => {
    if (editingCarId === null) {
      return;
    }
    dispatch(updateCarThunk({
      id: editingCarId,
      car: { name: editCarName, color: editCarColor },
    }));
    dispatch(resetEditForm());
  };

  return {
    editingCarId,
    editCarName, setEditCarName,
    editCarColor, setEditCarColor,
    isEditNameValid,
    handleEdit,
    startEditing,
  };
};
