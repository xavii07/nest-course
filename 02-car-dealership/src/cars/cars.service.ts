import { Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v4 as uuid } from 'uuid';
import { UpdateCarDto, CreateCarDto } from './dto';

@Injectable()
export class CarsService {
  private cars: Car[] = [
    /*{
      id: uuid(),
      brand: 'BMW',
      model: 'X5',
    },
    {
      id: uuid(),
      brand: 'Tesla',
      model: 'S',
    },
    {
      id: uuid(),
      brand: 'Mercedes',
      model: 'E',
    },*/
  ];

  getAll() {
    return this.cars;
  }

  getOneById(id: string) {
    const car = this.cars.find((car) => car.id === id);
    if (!car) {
      throw new NotFoundException(`Car with id ${id} not found`);
    }

    return car;
  }

  create(createCarDto: CreateCarDto) {
    const newCar: Car = { id: uuid(), ...createCarDto };
    this.cars.push(newCar);

    return newCar;
  }

  update(id: string, updateCarDto: UpdateCarDto) {
    let carInDb = this.getOneById(id);

    this.cars = this.cars.map((car) => {
      if (car.id === id) {
        carInDb = {
          ...carInDb,
          ...updateCarDto,
          id,
        };
        return carInDb;
      }
      return car;
    });

    return {
      carInDb,
    };
  }

  delete(id: string) {
    this.getOneById(id);

    this.cars = this.cars.filter((car) => car.id !== id);

    return {
      message: 'Car deleted',
    };
  }

  buildWithSeedData(cars: Car[]) {
    this.cars = cars;
  }
}
