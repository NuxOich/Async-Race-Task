import styles from './Garage.module.css';
import CarCard from '../../components/CarCard/CarCard';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectAllCars, selectCarsTotalCount } from '../../features/cars/carsSlice';
import { MAX_CAR_NAME_LENGTH, RANDOM_CARS_COUNT, CARS_PER_PAGE } from '../../constants';
import { generateRandomCar } from '../../utils/randomCarGenerator';
import { useSearchParams } from 'react-router-dom';
import { carValidation } from '../../utils/validation';
import { deleteWinner } from '../../features/winners/winnersSlice';
import type { Car } from '../../api/types';
import { createCarThunk, createManyCarsThunk, deleteCarThunk, updateCarThunk } from '../../features/cars/carsThunk';

const Garage = () => {
  const [carName, setCarName] = useState<string>('');
  const [carColor, setCarColor] = useState<string>('#000000');
  const [editingCarId, setEditingCarId] = useState<number | null>(null);
  const [editCarName, setEditCarName] = useState<string>('');
  const [editCarColor, setEditCarColor] = useState<string>('#000000');

  const [searchParams, setSearchParams] = useSearchParams();


  const cars = useAppSelector(selectAllCars);
  const carsTotalCount = useAppSelector(selectCarsTotalCount);
  const dispatch = useAppDispatch();

  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const totalPages = Math.ceil(carsTotalCount / CARS_PER_PAGE);
  const safePage = Math.max(1, Math.min(currentPage, totalPages || 1));

  const startIndex = (safePage - 1) * CARS_PER_PAGE;
  const endIndex = startIndex + CARS_PER_PAGE;

  const currentCars = cars.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber: number) => {
    setSearchParams((prev) => {
      prev.set('page', pageNumber.toString());
      return prev;
    })
  }

  const handleEditCar = (car: Car): void => {
    setEditingCarId(car.id);
    setEditCarName(car.name);
    setEditCarColor(car.color);
  };

  const handleDeleteCar = (carId: number) => {
    dispatch(deleteCarThunk(carId));
    dispatch(deleteWinner(carId));
  };

  const isNameValid = carValidation(carName, MAX_CAR_NAME_LENGTH);
  const isEditNameValid = carValidation(editCarName, MAX_CAR_NAME_LENGTH);

  const carsGenerationHandler = () => {
    const generatedCars = Array.from({ length: RANDOM_CARS_COUNT }, generateRandomCar);
    dispatch(createManyCarsThunk(generatedCars));
  }

  return (
    <main className={styles.garageWrapper}>
      <div className={styles.container}>
        <div className={styles.garageSettings}>
          <div className={styles.createCar}>
            <Input type='text' value={carName} onChange={(e) => setCarName(e.target.value)} placeholder='Car Name' />
            <Input type='color' value={carColor} onChange={(e) => setCarColor(e.target.value)} />
            <Button text='Create Car' disabled={!isNameValid} onClick={() => {
              dispatch(createCarThunk({
                name: carName,
                color: carColor,
              }));
              setCarName('');
              setCarColor('#000000')
            }} />
          </div>
          <div className={styles.editCar}>
            <Input type='text' value={editCarName} onChange={(e) => setEditCarName(e.target.value)} placeholder='Car Name' />
            <Input type='color' value={editCarColor} onChange={(e) => setEditCarColor(e.target.value)} />
            <Button text='Edit Car' disabled={!isEditNameValid || editingCarId === null} onClick={() => {
              if (editingCarId !== null) {
                dispatch(updateCarThunk({
                  id: editingCarId,
                  car: {
                    name: editCarName,
                    color: editCarColor,
                  }
                }));
                setEditingCarId(null);
              }
            }} />
          </div>
          <div className={styles.btnsContainer}>
            <Button text='Race' />
            <Button text='Reset' />
            <Button text='Generate Cars' onClick={carsGenerationHandler} />
          </div>
        </div>

        <div className={styles.carCount}>
          <p>{`Cars: ${carsTotalCount}`}</p>
        </div>

        <div className={styles.carsList}>
          {currentCars.map((car) => <CarCard
            key={car.id}
            name={car.name}
            color={car.color}
            onEdit={() => handleEditCar(car)}
            onRemove={() => handleDeleteCar(car.id)} />)}
        </div>

        <div className={styles.pages}>
          <p>{`Page ${safePage}`}</p>
          <div>
            <Button icon='<' onClick={() => handlePageChange(safePage - 1)} disabled={safePage === 1} />
            <Button icon='>' onClick={() => handlePageChange(safePage + 1)} disabled={safePage >= totalPages} />
          </div>
        </div>
      </div>
    </main>
  )
};

export default Garage;