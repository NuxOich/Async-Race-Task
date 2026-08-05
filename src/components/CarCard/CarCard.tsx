import styles from './CarCard.module.css';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import Button from '../Button/Button';
import CarIcon from '../CarIcon/CarIcon';
import { startCarEngineThunk, stopCarEngineThunk } from '../../features/race/raceThunk';
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
      <div className={styles.controls}>
        <div className={styles.controlsRow}>
          <Button text="Edit" disabled={!isIdle} onClick={onEdit} />
          <Button variant='danger' text="Remove" disabled={!isIdle} onClick={onRemove} />
        </div>
        <div className={styles.controlsRow}>
          <Button variant='primary' size='compact' icon={faPlay} disabled={!isIdle} onClick={() => dispatch(startCarEngineThunk(id))} />
          <Button size='compact' icon={faPause} disabled={isIdle} onClick={() => dispatch(stopCarEngineThunk(id))} />
        </div>
      </div>

      <div className={styles.trackArea}>
        <p className={styles.carName}>{name}</p>
        <div className={styles.carRaceTrack}>
          <div ref={carElementRef} className={styles.car}>
            <CarIcon color={color} />
          </div>
          <div className={styles.track}></div>
        </div>
      </div>
    </div>
  );
};

export default CarCard;