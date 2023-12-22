import { Car } from './../../cars/interfaces/car.interface';
import { v4 as uuid } from 'uuid';

export const CARS_SEED: Car[] = [
  {
    id: uuid(),
    brand: 'Toyota',
    model: 'Cheroki',
  },
  {
    id: uuid(),
    brand: 'AUD',
    model: 'C84',
  },
  {
    id: uuid(),
    brand: 'Mazda',
    model: 'BT-50',
  },
];
