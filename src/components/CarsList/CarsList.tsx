import styles from './CarsList.module.css';
import CarCard from '../CarCard/CarCard';
import type { Car } from '../../api/types';

interface CarsListProps {
  cars: Car[];
  status: 'idle' | 'loading' | 'error';
  onEdit: (car: Car) => void;
  onRemove: (id: number) => void;
}

const CarsList = ({ cars, status, onEdit, onRemove }: CarsListProps) => (
  <div className={styles.carsList}>
    {status === 'loading' && <p className={styles.loading}>Loading...</p>}

    {status === 'idle' &&
      cars.map((car) => (
        <CarCard
          key={car.id}
          id={car.id}
          name={car.name}
          color={car.color}
          onEdit={() => onEdit(car)}
          onRemove={() => onRemove(car.id)}
        />
      ))}

    {status === 'error' && <p className={styles.error}>Failed to load cars!</p>}

    {status === 'idle' && cars.length === 0 && <p>No Cars</p>}
  </div>
);

export default CarsList;
