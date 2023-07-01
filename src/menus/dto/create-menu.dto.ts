import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Entity } from 'typeorm';

@Entity()
export class CreateMenuDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  path: string;

  @IsNumber()
  @IsNotEmpty()
  order: number;

  @IsString()
  @IsOptional()
  acl: string;
}
