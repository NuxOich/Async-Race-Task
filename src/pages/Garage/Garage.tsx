import styles from './Garage.module.css';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import {
  selectAllCars,
  selectCarsTotalCount,
} from '../../features/cars/carsSlice';
import { RANDOM_CARS_COUNT, CARS_PER_PAGE } from '../../constants';
import { generateRandomCar } from '../../utils/randomCarGenerator';
import {
  createManyCarsThunk,
  deleteCarThunk,
  fetchCars,
} from '../../features/cars/carsThunk';
import type { RootState } from '../../store/store';
import { deleteWinnerThunk } from '../../features/winners/winnersThunk';
import { useCreateCarForm } from '../../hooks/useCreateCarForm';
import { useEditCarForm } from '../../hooks/useEditCarForm';
import { useGaragePagination } from '../../hooks/useGaragePagination';
import { useGarageRace } from '../../hooks/useGarageRace';
import CarsList from '../../components/CarsList/CarsList';
import Pagination from '../../components/Pagination/Pagination';

const Garage = () => {
  const cars = useAppSelector(selectAllCars);
  const carsTotalCount = useAppSelector(selectCarsTotalCount);

  const {
    editingCarId,
    editCarName,
    setEditCarName,
    editCarColor,
    setEditCarColor,
    isEditNameValid,
    handleEdit,
    startEditing,
  } = useEditCarForm();
  const { safePage, totalPages, handlePageChange, setSearchParams } =
    useGaragePagination(carsTotalCount);
  const {
    carName,
    carColor,
    setCarName,
    setCarColor,
    isNameValid,
    handleCreate,
  } = useCreateCarForm(safePage, CARS_PER_PAGE);
  const { isRacing, handleRace, handleReset, bannerWinnerId, clearWinnerBanner } = useGarageRace(
    cars,
    safePage,
  );

  const status = useAppSelector((state: RootState) => state.cars.status);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCars({ page: safePage, limit: CARS_PER_PAGE }));
  }, [safePage, dispatch]);

  const handleDeleteCar = async (carId: number) => {
    const result = await dispatch(
      deleteCarThunk({ id: carId, page: safePage, limit: CARS_PER_PAGE }),
    ).unwrap();
    dispatch(deleteWinnerThunk(carId));
    if (result.targetPage) {
      setSearchParams((prev) => {
        prev.set('page', String(result.targetPage));
        return prev;
      });
    }
  };

  const carsGenerationHandler = () => {
    const generatedCars = Array.from(
      { length: RANDOM_CARS_COUNT },
      generateRandomCar,
    );
    dispatch(
      createManyCarsThunk({
        cars: generatedCars,
        page: safePage,
        limit: CARS_PER_PAGE,
      }),
    );
  };

  return (
    <main className={styles.garageWrapper}>
      <div className={styles.container}>
        <div className={styles.garageSettings}>
          <div className={styles.createCar}>
            <Input
              type="text"
              value={carName}
              onChange={(e) => setCarName(e.target.value)}
              placeholder="Car Name"
            />
            <Input
              type="color"
              value={carColor}
              onChange={(e) => setCarColor(e.target.value)}
            />
            <Button
              text="Create Car"
              disabled={!isNameValid || status === 'loading' || isRacing}
              onClick={handleCreate}
            />
          </div>
          <div className={styles.editCar}>
            <Input
              type="text"
              value={editCarName}
              onChange={(e) => setEditCarName(e.target.value)}
              placeholder="Car Name"
            />
            <Input
              type="color"
              value={editCarColor}
              onChange={(e) => setEditCarColor(e.target.value)}
            />
            <Button
              text="Edit Car"
              disabled={
                !isEditNameValid ||
                editingCarId === null ||
                status === 'loading' ||
                isRacing
              }
              onClick={handleEdit}
            />
          </div>
          <div className={styles.btnsContainer}>
            <Button variant='primary' text="Race" disabled={isRacing} onClick={handleRace} />
            <Button text="Reset" disabled={!isRacing} onClick={handleReset} />
            <Button
              text="Generate Cars"
              disabled={isRacing}
              onClick={carsGenerationHandler}
            />
          </div>
        </div>

        <div className={styles.carCount}>
          <p>{`Cars: ${carsTotalCount}`}</p>
        </div>

        <CarsList
          status={status}
          cars={cars}
          onEdit={startEditing}
          onRemove={handleDeleteCar}
        />

        {bannerWinnerId && (
          <div className={styles.winnerOverlay}>
            <div className={styles.winnerModal}>
              <Button icon={faClose} onClick={clearWinnerBanner} variant='close' />
              <h2>WINNER</h2>
              <p>{cars.find((car) => bannerWinnerId === car.id)?.name}</p>
            </div>
          </div>
        )}

        <Pagination
          currentPage={safePage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </main>
  );
};

export default Garage;
