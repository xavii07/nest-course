import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { validate as isUUID } from 'uuid';
import { ProductImage } from './entities/product-image.entity';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger('ProductService');

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(ProductImage)
    private readonly productImageRepository: Repository<ProductImage>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const { images = [], ...productDetails } = createProductDto;

    try {
      const producto = this.productRepository.create({
        ...productDetails,
        images: images.map((image) =>
          this.productImageRepository.create({ url: image }),
        ),
      });
      await this.productRepository.save(producto);
      return { ...producto, images };
    } catch (error) {
      this.handleExeptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    try {
      const products = await this.productRepository.find({
        take: limit,
        skip: offset,
        relations: {
          images: true,
        },
      });
      return products.map((product) => ({
        ...product,
        images: product.images.map((image) => image.url),
      }));
    } catch (error) {
      this.handleExeptions(error);
    }
  }

  async findOne(term: string) {
    try {
      let product: Product;
      if (isUUID(term)) {
        product = await this.productRepository.findOneBy({ id: term });
      } else {
        //product = await this.productRepository.findOneBy({ slug: term });
        const queryBuilder = this.productRepository.createQueryBuilder('prod'); //Todo: alias prod para hacer join de la tabla de imagenes
        product = await queryBuilder
          .where('LOWER(title)=:title or slug=:slug', {
            title: term.toLocaleLowerCase(),
            slug: term.toLocaleLowerCase(),
          })
          .leftJoinAndSelect('prod.images', 'prodImages') //Todo: join de la tabla de imagenes
          .getOne(); //select * from product where slug='xx' or title='xx'
      }

      if (!product) throw new NotFoundException('Product not found');

      return product;
    } catch (error) {
      this.handleExeptions(error);
    }
  }

  async findOneClean(term: string) {
    const { images = [], ...restProduct } = await this.findOne(term);
    return {
      ...restProduct,
      images: images.map((image) => image.url),
    };
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.preload({
      id: id,
      ...updateProductDto,
      images: [],
    });
    try {
      if (!product) throw new NotFoundException('Product not found ' + id);
      await this.productRepository.save(product);

      return product;
    } catch (error) {
      this.handleExeptions(error);
    }
  }

  async remove(id: string) {
    const product = await this.findOne(id);
    await this.productRepository.remove(product);

    return {
      message: 'Product deleted successfully',
    };
  }

  private handleExeptions(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    this.logger.error(error);
    throw new InternalServerErrorException('Unexpected error checking product');
  }
}
