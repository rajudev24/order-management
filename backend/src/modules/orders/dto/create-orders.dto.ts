import {
  IsArray,
  IsNumber,
  IsOptional,
  IsPositive,
  Min,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";

class OrderItemDto {
  @IsNumber()
  @IsPositive()
  productId: number;

  @IsNumber()
  @IsPositive()
  @Min(1)
  quantity: number;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  discount?: number;
}

export class CreateOrdersDto {
  @IsNumber()
  @IsPositive()
  userId: number;

  @IsNumber()
  @IsPositive()
  subtotal: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];

  @IsNumber()
  @Min(0)
  total_discount: number;

  @IsNumber()
  @IsPositive()
  grand_total: number;
}
