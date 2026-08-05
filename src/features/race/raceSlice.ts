import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store/store';

export type EngineStatus =
  'idle' | 'started' | 'driving' | 'finished' | 'broken';

interface CarRaceState {
  status: EngineStatus;
  velocity: number;
  distance: number;
}

interface RaceState {
  carsRace: Record<number, CarRaceState>;
  winnerId: number | null;
  bannerWinnerId: number | null;
  isRacing: boolean;
  sessionId: number;
}

const initialState: RaceState = {
  carsRace: {},
  winnerId: null,
  bannerWinnerId: null,
  isRacing: false,
  sessionId: 0,
};

export const raceSlice = createSlice({
  name: 'race',
  initialState,
  reducers: {
    setCarStarted: (
      state,
      action: PayloadAction<{ id: number; velocity: number; distance: number }>,
    ) => {
      const { id, velocity, distance } = action.payload;
      state.carsRace[id] = {
        status: 'started',
        velocity,
        distance,
      };
    },
    setCarDriving: (state, action: PayloadAction<{ id: number }>) => {
      const carRace = state.carsRace[action.payload.id];
      if (carRace) {
        carRace.status = 'driving';
      }
    },
    setCarBroken: (state, action: PayloadAction<{ id: number }>) => {
      const carRace = state.carsRace[action.payload.id];
      if (carRace) {
        carRace.status = 'broken';
      }
    },
    setCarFinished: (state, action: PayloadAction<{ id: number }>) => {
      const carRace = state.carsRace[action.payload.id];
      if (!carRace) {
        return;
      }

      carRace.status = 'finished';
      if (state.isRacing && state.winnerId === null) {
        state.winnerId = action.payload.id;
        state.bannerWinnerId = action.payload.id;
      }
    },
    resetCar: (state, action: PayloadAction<{ id: number }>) => {
      delete state.carsRace[action.payload.id];
    },
    startRace: (state) => {
      state.isRacing = true;
      state.winnerId = null;
      state.bannerWinnerId = null;
    },
    endRace: (state) => {
      state.isRacing = false;
      state.winnerId = null;
      state.bannerWinnerId = null;
      state.sessionId += 1;
    },
    resetRace: (state) => {
      state.carsRace = {};
      state.winnerId = null;
      state.isRacing = false;
      state.sessionId += 1;
    },
    clearWinner: (state) => {
      state.bannerWinnerId = null;
    }
  },
});

export const selectCarRaceState = (id: number) => (state: RootState) =>
  state.race.carsRace[id];
export const selectIsRacing = (state: RootState) => state.race.isRacing;
export const selectWinnerId = (state: RootState) => state.race.winnerId;

export const {
  setCarStarted,
  setCarDriving,
  setCarBroken,
  setCarFinished,
  resetCar,
  startRace,
  endRace,
  resetRace,
  clearWinner,
} = raceSlice.actions;
export default raceSlice.reducer;
