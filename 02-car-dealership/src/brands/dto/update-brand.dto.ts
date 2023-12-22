import { IsString, MinLength } from 'class-validator';

export class UpdateBrandDto {
  @IsString()
  @MinLength(2)
  name: string;
}
