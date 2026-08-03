import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store/store";
import type { WinnerWithCarInfo } from "../../api/types";
import { deleteWinnerThunk, fetchWinners } from "./winnersThunk";

interface WinnersState {
  items: WinnerWithCarInfo[];
  totalCount: number;
  sortBy: 'wins' | 'time' | null;
  sortOrder: 'ASC' | 'DESC';
  status: 'idle' | 'loading' | 'error';
  error: string | null;
};

const initialState: WinnersState = {
  items: [],
  totalCount: 0,
  sortBy: null,
  sortOrder: 'ASC',
  status: 'idle',
  error: null,
};

const winnersSlice = createSlice({
  name: 'winners',
  initialState,
  reducers: {
    setSorting: (state, action: PayloadAction<'wins' | 'time'>) => {
      const field = action.payload;
      if (state.sortBy === field) {
        state.sortOrder = state.sortOrder === 'ASC' ? 'DESC' : 'ASC';
      } else {
        state.sortBy = field;
        state.sortOrder = 'ASC';
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWinners.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchWinners.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = action.payload.items;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(fetchWinners.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message ?? 'Unknown error';
      })
      .addCase(deleteWinnerThunk.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(deleteWinnerThunk.fulfilled, (state) => {
        state.status = 'idle';
      })
      .addCase(deleteWinnerThunk.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message ?? 'Unknown error';
      })

  }
});

export const selectAllWinners = (state: RootState) => state.winners.items;
export const selectWinnersTotalCount = (state: RootState) => state.winners.totalCount;

export const { setSorting } = winnersSlice.actions;
export default winnersSlice.reducer; 