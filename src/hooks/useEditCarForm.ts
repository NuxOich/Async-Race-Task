import { useState } from 'react';
import { useAppDispatch } from '../store/hooks';
import { carValidation } from '../utils/validation';
import { MAX_CAR_NAME_LENGTH } from '../constants';
import { updateCarThunk } from '../features/cars/carsThunk';
import type { Car } from '../api/types';

export const useEditCarForm = () => {
  const [editingCarId, setEditingCarId] = useState<number | null>(null);
  const [editCarName, setEditCarName] = useState<string>('');
  const [editCarColor, setEditCarColor] = useState<string>('#000000');
  const dispatch = useAppDispatch();

  const isEditNameValid = carValidation(editCarName, MAX_CAR_NAME_LENGTH);

  const startEditing = (car: Car) => {
    setEditingCarId(car.id);
    setEditCarName(car.name);
    setEditCarColor(car.color);
  };

  const handleEdit = () => {
    if (editingCarId !== null) {
      dispatch(
        updateCarThunk({
          id: editingCarId,
          car: {
            name: editCarName,
            color: editCarColor,
          },
        }),
      );
      setEditingCarId(null);
      setEditCarName('');
      setEditCarColor('#000000');
    }
  };

  return {
    editingCarId,
    setEditingCarId,
    editCarName,
    setEditCarName,
    editCarColor,
    setEditCarColor,
    isEditNameValid,
    handleEdit,
    startEditing,
  };
};
