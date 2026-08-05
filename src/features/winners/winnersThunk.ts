import { createAsyncThunk } from '@reduxjs/toolkit';
import { getWinners, type Order, type Sort } from '../../api/winnersApi';
import { getCar } from '../../api/carsApi';
import type { WinnerWithCarInfo } from '../../api/types';
import { deleteWinner } from '../../api/winnersApi';

export const fetchWinners = createAsyncThunk(
  'winners/fetchWinners',
  async ({
    page,
    limit,
    sort,
    order,
  }: {
    page: number;
    limit: number;
    sort: Sort;
    order: Order;
  }) => {
    const winnersData = await getWinners(page, limit, sort, order);
    const carsResults = await Promise.all(
      winnersData.items.map((winner) => getCar(winner.id)),
    );

    const items: WinnerWithCarInfo[] = winnersData.items.map(
      (winner, index) => ({
        ...winner,
        name: carsResults[index].name,
        color: carsResults[index].color,
      }),
    );

    return {
      items,
      totalCount: winnersData.totalCount,
    };
  },
);

export const deleteWinnerThunk = createAsyncThunk(
  'winners/deleteWinner',
  async (id: number) => {
    await deleteWinner(id);
  },
);
