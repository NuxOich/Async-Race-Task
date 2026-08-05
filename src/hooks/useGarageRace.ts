import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import type { RootState } from '../store/store';
import {
  recordWinnerThunk,
  startCarEngineThunk,
  stopCarEngineThunk,
} from '../features/race/raceThunk';
import { MS_TO_SECONDS, TIME_DECIMAL_PLACES } from '../constants';
import { endRace, resetRace, startRace } from '../features/race/raceSlice';
import type { Car } from '../api/types';

export const useGarageRace = (cars: Car[], safePage: number) => {
  const winnerId = useAppSelector((state: RootState) => state.race.winnerId);
  const winnerRaceState = useAppSelector(
    (state: RootState) => state.race.carsRace,
  );
  const isRacing = useAppSelector((state: RootState) => state.race.isRacing);
  const dispatch = useAppDispatch();

  const recordedWinnerRef = useRef<number | null>(null);

  useEffect(() => {
    if (winnerId === null) {
      recordedWinnerRef.current = null;
      return;
    }
    if (recordedWinnerRef.current === winnerId) {
      return;
    }

    recordedWinnerRef.current = winnerId;

    const { distance, velocity } = winnerRaceState[winnerId];
    const time = Number(
      (distance / velocity / MS_TO_SECONDS).toFixed(TIME_DECIMAL_PLACES),
    );
    dispatch(recordWinnerThunk({ id: winnerId, time }));
  }, [winnerId, winnerRaceState, dispatch]);

  useEffect(
    () => () => {
      dispatch(resetRace());
    },
    [dispatch],
  );

  useEffect(() => {
    dispatch(resetRace());
  }, [safePage, dispatch]);

  const handleRace = async () => {
    dispatch(startRace());
    await Promise.all(cars.map((car) => dispatch(startCarEngineThunk(car.id))));
  };

  const handleReset = async () => {
    dispatch(endRace());
    await Promise.all(cars.map((car) => dispatch(stopCarEngineThunk(car.id))));
  };

  return { winnerId, isRacing, handleRace, handleReset };
};
