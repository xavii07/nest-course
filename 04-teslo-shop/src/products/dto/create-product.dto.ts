import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
  IsIn,
} from 'class-validator';

export class CreateProductDto {

   @ApiProperty({
    description: 'Product title',
    example: 'T-Shirt Nike',
    uniqueItems: true,
    minLength: 1,
  })
  @IsString()
  @MinLength(1)
  title: string;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @IsOptional()
  price?: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  slug?: string;

  @ApiProperty()
  @IsInt()
  @IsPositive()
  @IsOptional()
  stock?: number;

  @ApiProperty()
  @IsString({ each: true })
  @IsArray()
  sizes: string[];

  @IsIn(['men', 'women', 'kid', 'unisex'])
  gender: string;

  @ApiProperty()
  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  tags: string[];

  @ApiProperty()
  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  images?: string[];
}
