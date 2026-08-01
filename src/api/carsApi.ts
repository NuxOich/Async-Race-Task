import { API_BASE_URL, API_ENDPOINTS } from "./apiConfig";
import type { Car, CarInput } from "./types";

interface GetCarsResponse {
  items: Car[];
  totalCount: number;
}

export const getCars = async (page: number, limit: number): Promise<GetCarsResponse> => {
  const url = `${API_BASE_URL}${API_ENDPOINTS.garage}?_page=${page}&_limit=${limit}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch.');
  }
  const totalCount = response.headers.get('X-Total-Count');
  const data = (await response.json()) as Car[];
  return {
    items: data,
    totalCount: totalCount ? parseInt(totalCount, 10) : data.length,
  }
};

export const getCar = async (id: number): Promise<Car> => {
  const url = `${API_BASE_URL}${API_ENDPOINTS.garage}/${id}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch.');
  }
  return (await response.json()) as Car;
};

export const createCar = async (car: CarInput): Promise<Car> => {
  const url = `${API_BASE_URL}${API_ENDPOINTS.garage}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(car),
  });
  if (!response.ok) {
    throw new Error('Failed to post.')
  }
  return (await response.json()) as Car;
};

export const deleteCar = async (id: number): Promise<void> => {
  const url = `${API_BASE_URL}${API_ENDPOINTS.garage}/${id}`;
  const response = await fetch(url, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete.')
  }
};

export const updateCar = async (id: number, car: CarInput): Promise<Car> => {
  const url = `${API_BASE_URL}${API_ENDPOINTS.garage}/${id}`;
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(car),
  });
  if (!response.ok) {
    throw new Error('Failed to update.')
  }
  return (await response.json()) as Car;
};