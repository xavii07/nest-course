import { Injectable } from '@nestjs/common';
import { ProductsService } from 'src/products/products.service';
import { initialData } from './data/seed-data';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class SeedService {
  constructor(
    private readonly productService: ProductsService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, //? 👈 Inject User Repository
  ) {}

  async runSeed() {

    await this.deleteTables()

    // Insert Users
    const adminUser = await this.insertUsers();

    await this.insertNewProducts(adminUser);

    return `Executed Seed`;
  }

  private async deleteTables() {
    await this.productService.deleteAllProducts();

    const queryBuilder = this.userRepository.createQueryBuilder();
    await queryBuilder.delete().where({}).execute();

  }

  private async insertUsers() {
    const seedUsers = initialData.users;

    const users: User[] = [];

    seedUsers.forEach((user) => {
      users.push(this.userRepository.create(user));
    });

   const dbUsers = await this.userRepository.save(users);

    return dbUsers[0];

  }



  private async insertNewProducts(user: User) {
    await this.productService.deleteAllProducts();

    const products = initialData.products;
    const promiseProducts = [];

    products.forEach((product) => {
      promiseProducts.push(this.productService.create(product, user));
    });

    await Promise.all(promiseProducts);

    return true;
  }
}
