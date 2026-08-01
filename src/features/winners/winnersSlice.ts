import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { MOCK_WINNERS } from "../../constants";
import type { RootState } from "../../store/store";
import type { WinnerWithCarInfo } from "../../api/types";

interface WinnersState {
  items: WinnerWithCarInfo[];
  totalCount: number;
  sortBy: 'wins' | 'time' | null;
  sortOrder: 'ASC' | 'DESC';
};

const initialState: WinnersState = {
  items: MOCK_WINNERS,
  totalCount: MOCK_WINNERS.length,
  sortBy: null,
  sortOrder: 'ASC',
};

const winnersSlice = createSlice({
  name: 'winners',
  initialState,
  reducers: {
    deleteWinner: (state, action: PayloadAction<number>) => {
      const index = state.items.findIndex((winner) => winner.id === action.payload);
      if (index !== -1) {
        state.items.splice(index, 1);
        state.totalCount -= 1;
      }
    },
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
});

export const selectAllWinners = (state: RootState) => state.winners.items;
export const selectWinnersTotalCount = (state: RootState) => state.winners.totalCount;
export const selectSortedWinners = (state: RootState) => {
  const { items, sortBy, sortOrder } = state.winners;
  if (sortBy === null) return items;

  const sorted = [...items].sort((a, b) => {
    const diff = a[sortBy] - b[sortBy];
    return sortOrder === 'ASC' ? diff : -diff;
  });
  return sorted;
};

export const { deleteWinner, setSorting } = winnersSlice.actions;
export default winnersSlice.reducer; 