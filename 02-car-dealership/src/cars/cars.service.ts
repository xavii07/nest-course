import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class CarsService {
  private cars = [
    {
      id: 1,
      brand: 'BMW',
      model: 'X5',
    },
    {
      id: 2,
      brand: 'Tesla',
      model: 'S',
    },
    {
      id: 3,
      brand: 'Mercedes',
      model: 'E',
    },
  ];

  getAll() {
    return this.cars;
  }

  getOneById(id: number) {
    const car = this.cars.find((car) => car.id === id);
    if (!car) {
      throw new NotFoundException(`Car with id ${id} not found`);
    }

    return car;
  }
}
