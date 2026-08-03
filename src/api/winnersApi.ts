import { API_BASE_URL, API_ENDPOINTS } from "./apiConfig";
import type { CreateWinner, UpdateWinner, Winner } from "./types";

export type Sort = 'id' | 'wins' | 'time' | null;
export type Order = 'ASC' | 'DESC';

interface GetWinnersResponse {
  items: Winner[];
  totalCount: number;
}

export const getWinners = async (page: number, limit: number, sort: Sort, order: Order): Promise<GetWinnersResponse> => {
  const url = `${API_BASE_URL}${API_ENDPOINTS.winners}?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch.')
  }

  const totalCount = response.headers.get('X-Total-Count');
  const data = (await response.json()) as Winner[];
  return {
    items: data,
    totalCount: totalCount ? parseInt(totalCount, 10) : data.length,
  };
};

export const getWinner = async (id: number): Promise<Winner> => {
  const url = `${API_BASE_URL}${API_ENDPOINTS.winners}/${id}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch.')
  }

  return (await response.json()) as Winner;
};

export const createWinner = async (winner: CreateWinner): Promise<Winner> => {
  const url = `${API_BASE_URL}${API_ENDPOINTS.winners}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(winner),
  });

  if (response.status === 500) {
    throw new Error(' Insert failed, duplicate id')
  } else if (!response.ok) {
    throw new Error('Failed to post.')
  }

  return (await response.json()) as Winner;
};

export const deleteWinner = async (id: number): Promise<void> => {
  const url = `${API_BASE_URL}${API_ENDPOINTS.winners}/${id}`;
  const response = await fetch(url, {
    method: 'DELETE',
  });

  if (!response.ok && response.status !== 404) {
    throw new Error('Failed to delete.')
  }
};

export const updateWinner = async (id: number, winner: UpdateWinner): Promise<Winner> => {
  const url = `${API_BASE_URL}${API_ENDPOINTS.winners}/${id}`;
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(winner),
  });

  if (!response.ok) {
    throw new Error('Failed to update.')
  }

  return (await response.json()) as Winner;
};