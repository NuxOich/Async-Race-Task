import type { Car, WinnerWithCarInfo } from "./api/types";


export const MOCK_CARS: Car[] = [
  { id: 1, name: 'Tesla Model S', color: '#e63946' },
  { id: 2, name: 'Ford Mustang', color: '#1d3557' },
  { id: 3, name: 'Bugatti Chiron', color: '#2a9d8f' },
];




export const MOCK_WINNERS: WinnerWithCarInfo[] = [
  {
    id: 1,
    name: "Lightning McQ",
    color: "#FF0000",
    wins: 4,
    time: 42.15
  },
  {
    id: 2,
    name: "The Green Machine",
    color: "#00FF00",
    wins: 2,
    time: 45.82
  },
  {
    id: 3,
    name: "Blue Thunder",
    color: "#0000FF",
    wins: 5,
    time: 41.08
  },
  {
    id: 4,
    name: "Shadow Rider",
    color: "#111111",
    wins: 1,
    time: 49.34
  },
  {
    id: 5,
    name: "Gold Rush",
    color: "#FFD700",
    wins: 3,
    time: 43.50
  },
  {
    id: 6,
    name: "Lightning McQ",
    color: "#FF0000",
    wins: 4,
    time: 42.15
  },
  {
    id: 7,
    name: "The Green Machine",
    color: "#00FF00",
    wins: 2,
    time: 45.82
  },
  {
    id: 8,
    name: "Blue Thunder",
    color: "#0000FF",
    wins: 5,
    time: 41.08
  },
  {
    id: 9,
    name: "Shadow Rider",
    color: "#111111",
    wins: 1,
    time: 49.34
  },
  {
    id: 10,
    name: "Gold Rush",
    color: "#FFD700",
    wins: 3,
    time: 43.50
  }, {
    id: 11,
    name: "Lightning McQ",
    color: "#FF0000",
    wins: 4,
    time: 42.15
  },
  {
    id: 12,
    name: "The Green Machine",
    color: "#00FF00",
    wins: 2,
    time: 45.82
  },
  {
    id: 13,
    name: "Blue Thunder",
    color: "#0000FF",
    wins: 5,
    time: 41.08
  },
  {
    id: 14,
    name: "Shadow Rider",
    color: "#111111",
    wins: 1,
    time: 49.34
  },
  {
    id: 15,
    name: "Gold Rush",
    color: "#FFD700",
    wins: 3,
    time: 43.50
  }, {
    id: 16,
    name: "Lightning McQ",
    color: "#FF0000",
    wins: 4,
    time: 42.15
  },
  {
    id: 17,
    name: "The Green Machine",
    color: "#00FF00",
    wins: 2,
    time: 45.82
  },
  {
    id: 18,
    name: "Blue Thunder",
    color: "#0000FF",
    wins: 5,
    time: 41.08
  },
  {
    id: 19,
    name: "Shadow Rider",
    color: "#111111",
    wins: 1,
    time: 49.34
  },
  {
    id: 20,
    name: "Gold Rush",
    color: "#FFD700",
    wins: 3,
    time: 43.50
  },
];

export const CAR_BRANDS = [
  "Toyota",
  "BMW",
  "Mercedes-Benz",
  "Honda",
  "Ford",
  "Audi",
  "Hyundai",
  "Tesla",
  "Chevrolet",
  "Volkswagen",
  "Nissan",
  "Porsche"
];

export const CAR_MODELS = [
  "Camry",
  "M5",
  "E-Class",
  "Civic",
  "Mustang",
  "A6",
  "Elantra",
  "Model 3",
  "Corvette",
  "Golf",
  "Altima",
  "Carrera"
];


export const MAX_CAR_NAME_LENGTH = 20;
export const RANDOM_CARS_COUNT = 100;
export const CARS_PER_PAGE = 7;
export const WINNERS_PER_PAGE = 10;