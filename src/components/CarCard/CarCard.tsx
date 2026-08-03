import styles from './CarCard.module.css'
import Button from '../Button/Button';
import CarIcon from '../CarIcon/CarIcon';
import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectCarRaceState, setCarFinished } from '../../features/race/raceSlice';
import { startCarEngineThunk, stopCarEngineThunk } from '../../features/race/raceThunk';



interface CarCardProps {
  id: number;
  name: string;
  color: string;
  onEdit: () => void;
  onRemove: () => void;
}

const CarCard = ({ id, name, color, onEdit, onRemove }: CarCardProps) => {
  const carElementRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<Animation | null>(null);

  const raceState = useAppSelector(selectCarRaceState(id));
  const dispatch = useAppDispatch();
  useEffect(() => {
    const carElement = carElementRef.current;
    if (!carElement) return;

    if (raceState?.status === 'started') {
      const trackWidth = carElement.parentElement?.clientWidth ?? 0;
      animationRef.current = carElement.animate(
        [
          { transform: 'translateX(0)' },
          { transform: `translateX(${trackWidth}px)` },
        ],
        {
          duration: (raceState.distance / raceState.velocity),
          fill: 'forwards',
        }
      );
      animationRef.current.finished
        .then(() => dispatch(setCarFinished({ id })))
        .catch(() => { });
    }

    if (raceState?.status === 'broken') {
      animationRef.current?.pause();
    }

    if (!raceState) {
      animationRef.current?.cancel();
      animationRef.current = null;
    }
  }, [raceState?.status]);

  const isIdle = !raceState || raceState.status === 'idle';

  return (
    <div className={styles.carCardWrapper}>
      <div className={styles.carBackground}>
        <div className={styles.carSetting}>
          <Button text='Edit' disabled={!isIdle} onClick={onEdit} />
          <Button text='Remove' disabled={!isIdle} onClick={onRemove} />
          <Button text='Start' disabled={!isIdle} onClick={() => dispatch(startCarEngineThunk(id))} />
          <Button text='Stop' disabled={isIdle} onClick={() => dispatch(stopCarEngineThunk(id))} />
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
  )
};

export default CarCard;