export interface Car {
  id: number;
  name: string;
  color: string;
}

export interface Winner {
  id: number;
  wins: number;
  time: number;
}

export interface WinnerWithCarInfo extends Winner {
  name: string;
  color: string;
}

export interface EngineStatusParams {
  id: number;
  status: 'started' | 'stopped' | 'drive';
}

export interface EngineStarted {
  velocity: number;
  distance: number;
}

export interface EngineDrive {
  success: boolean;
}

export interface CarInput {
  name: string;
  color: string;
}

export interface CreateWinner {
  id: number;
  wins: number;
  time: number;
}

export interface UpdateWinner {
  wins: number;
  time: number;
}
