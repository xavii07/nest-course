import { Brand } from './../../brands/entities/brand.entity';
import { v4 as uuid } from 'uuid';

export const BRANDS_SEED: Brand[] = [
  {
    id: uuid(),
    name: 'Toyota',
    createdAt: new Date().getTime(),
  },
  {
    id: uuid(),
    createdAt: new Date().getTime(),
    name: 'Mazda',
  },
  {
    id: uuid(),
    name: 'AUD',
    createdAt: new Date().getTime(),
  },
];
