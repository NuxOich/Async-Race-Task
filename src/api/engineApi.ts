import { HTTP_STATUS } from '../constants';
import { API_BASE_URL, API_ENDPOINTS } from './apiConfig';
import type { EngineDrive, EngineStarted } from './types';

interface DriveSuccess {
  status: 'success';
  data: EngineDrive;
}

interface DriveBroken {
  status: 'broken';
}

type DriveResult = DriveSuccess | DriveBroken;

export const setEngineStatus = async (
  id: number,
  status: 'started' | 'stopped',
): Promise<EngineStarted> => {
  const url = `${API_BASE_URL}${API_ENDPOINTS.engine}?id=${id}&status=${status}`;
  const response = await fetch(url, {
    method: 'PATCH',
  });

  if (response.status === HTTP_STATUS.BAD_REQUEST) {
    throw new Error(
      'Wrong parameters: "id" should be any positive number, "status" should be "started", "stopped" or "drive"',
    );
  } else if (response.status === HTTP_STATUS.NOT_FOUND) {
    throw new Error('Car with such id was not found in the garage.');
  } else if (!response.ok) {
    throw new Error('Failed to patch.');
  }

  return (await response.json()) as EngineStarted;
};

export const switchToDrive = async (id: number): Promise<DriveResult> => {
  const url = `${API_BASE_URL}${API_ENDPOINTS.engine}?id=${id}&status=drive`;
  const response = await fetch(url, {
    method: 'PATCH',
  });

  switch (response.status) {
    case HTTP_STATUS.BAD_REQUEST:
      throw new Error(
        'Wrong parameters: "id" should be any positive number, "status" should be "started", "stopped" or "drive."',
      );
    case HTTP_STATUS.NOT_FOUND:
      throw new Error(
        'Engine parameters for car with such id was not found in the garage. Have you tried to set engine status to "started" before?',
      );
    case HTTP_STATUS.TOO_MANY_REQUESTS:
      throw new Error(
        "Drive already in progress. You can't run drive for the same car twice while it's not stopped.",
      );
    case HTTP_STATUS.INTERNAL_SERVER_ERROR:
      return { status: 'broken' };
    case HTTP_STATUS.OK: {
      const data = (await response.json()) as EngineDrive;
      return { status: 'success', data };
    }
    default:
      throw new Error('failed to set car to drive.');
  }
};
