import { Injectable } from '@nestjs/common';
import { ProductsService } from 'src/products/products.service';
import { initialData } from './data/seed-data';

@Injectable()
export class SeedService {
  constructor(private readonly productService: ProductsService) {}

  async runSeed() {
    this.insertNewProducts();

    return `Executed Seed`;
  }

  private async insertNewProducts() {
    await this.productService.deleteAllProducts();

    const products = initialData.products;
    const promiseProducts = [];

    products.forEach((product) => {
      promiseProducts.push(this.productService.create(product));
    });

    await Promise.all(promiseProducts);

    return true;
  }
}
