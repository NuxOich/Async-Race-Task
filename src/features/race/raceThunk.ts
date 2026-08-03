import { createAsyncThunk } from "@reduxjs/toolkit";
import { setEngineStatus, switchToDrive } from "../../api/engineApi";
import { resetCar, setCarBroken, setCarDriving, setCarStarted } from "./raceSlice";
import { createWinner, getWinner, updateWinner } from "../../api/winnersApi";
import type { RootState } from "../../store/store";



export const startCarEngineThunk = createAsyncThunk(
  'race/startCarEngine',
  async (id: number, { dispatch, getState }) => {
    const session = (getState() as RootState).race.sessionId;

    const { velocity, distance } = await setEngineStatus(id, 'started');
    if ((getState() as RootState).race.sessionId !== session) return;
    dispatch(setCarStarted({ id, velocity, distance }));

    const driveResult = await switchToDrive(id);
    if ((getState() as RootState).race.sessionId !== session) return;

    if (driveResult.status === 'broken') {
      dispatch(setCarBroken({ id }));
    } else {
      dispatch(setCarDriving({ id }));
    }
  }
);

export const stopCarEngineThunk = createAsyncThunk(
  'race/stopEngine',
  async (id: number, { dispatch }) => {
    await setEngineStatus(id, 'stopped');
    dispatch(resetCar({ id }));
  }
);

export const recordWinnerThunk = createAsyncThunk(
  'race/recordWinner',
  async ({ id, time }: { id: number, time: number }) => {
    const existingWinner = await getWinner(id);
    if (existingWinner !== null) {
      const newWins = existingWinner.wins + 1;
      const newTime = Math.min(existingWinner.time, time);
      return await updateWinner(id, { wins: newWins, time: newTime });
    } else {
      return await createWinner({ id, wins: 1, time });
    }
  }
);