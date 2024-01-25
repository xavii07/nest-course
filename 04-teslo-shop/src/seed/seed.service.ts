import { Injectable } from '@nestjs/common';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class SeedService {
  constructor(private readonly productService: ProductsService) {}

  async runSeed() {
    this.insertNewProducts();

    return `Executed Seed`;
  }

  private async insertNewProducts() {
    await this.productService.deleteAllProducts();
    return true;
  }
}
