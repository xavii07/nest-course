import { IsOptional, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto {

   @ApiProperty({
    default: 0,
    description: 'Number of items to skip before starting to collect the result set.',
  })
  @IsOptional()
  @IsPositive()
  //Trasforma el valor a un numero
  @Type(() => Number)
  offset?: number;

  @ApiProperty({
    default: 10,
    description: 'Number of items per page',
  })
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  limit?: number;
}
