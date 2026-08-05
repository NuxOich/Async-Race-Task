import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectCarRaceState, setCarFinished } from '../features/race/raceSlice';

export const useCarAnimation = (id: number) => {
  const carElementRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<Animation | null>(null);
  const raceState = useAppSelector(selectCarRaceState(id));
  const dispatch = useAppDispatch();

  useEffect(() => {
    const carElement = carElementRef.current;
    if (!carElement) {
      return;
    }

    if (raceState?.status === 'started') {
      const trackWidth = carElement.parentElement?.clientWidth ?? 0;
      const carWidth = carElement.clientWidth;
      const distance = trackWidth - carWidth;

      animationRef.current = carElement.animate(
        [
          { transform: 'translateX(0)' },
          { transform: `translateX(${distance}px)` },
        ],
        {
          duration: raceState.distance / raceState.velocity,
          fill: 'forwards',
        },
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [raceState?.status, id, dispatch]);

  return { carElementRef, raceState };
};
