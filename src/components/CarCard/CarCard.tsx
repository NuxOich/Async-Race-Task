import styles from './CarCard.module.css';
import Button from '../Button/Button';
import CarIcon from '../CarIcon/CarIcon';
import {
  startCarEngineThunk,
  stopCarEngineThunk,
} from '../../features/race/raceThunk';
import { useCarAnimation } from '../../hooks/useCarAnimation';
import { useAppDispatch } from '../../store/hooks';

interface CarCardProps {
  id: number;
  name: string;
  color: string;
  onEdit: () => void;
  onRemove: () => void;
}

const CarCard = ({ id, name, color, onEdit, onRemove }: CarCardProps) => {
  const { carElementRef, raceState } = useCarAnimation(id);
  const dispatch = useAppDispatch();
  const isIdle = !raceState || raceState.status === 'idle';

  return (
    <div className={styles.carCardWrapper}>
      <div className={styles.carBackground}>
        <div className={styles.carSetting}>
          <Button text="Edit" disabled={!isIdle} onClick={onEdit} />
          <Button text="Remove" disabled={!isIdle} onClick={onRemove} />
          <Button
            text="Start"
            disabled={!isIdle}
            onClick={() => dispatch(startCarEngineThunk(id))}
          />
          <Button
            text="Stop"
            disabled={isIdle}
            onClick={() => dispatch(stopCarEngineThunk(id))}
          />
        </div>
        <p className={styles.carName}>{name}</p>
      </div>

      <div className={styles.carRaceTrack}>
        <div ref={carElementRef} className={styles.car}>
          <CarIcon color={color} />
        </div>
        <div className={styles.track}></div>
      </div>
    </div>
  );
};

export default CarCard;
