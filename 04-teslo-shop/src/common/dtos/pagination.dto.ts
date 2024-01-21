import { IsOptional, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationDto {
  @IsOptional()
  @IsPositive()
  //Trasforma el valor a un numero
  @Type(() => Number)
  offset?: number;

  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  limit?: number;
}
