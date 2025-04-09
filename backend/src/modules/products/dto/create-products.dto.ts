import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

export class CreateProductsDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsNumber()
  @IsPositive()
  weight: number;

  @IsString()
  @IsNotEmpty()
  row_status: string;
}
