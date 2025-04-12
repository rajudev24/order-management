// create-promotion.dto.ts
import {
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsDateString,
  IsNumber,
  IsString,
  IsArray,
  ArrayMinSize,
} from "class-validator";

export enum DiscountType {
  PERCENTAGE = "PERCENTAGE",
  FIXED = "FIXED",
  WEIGHTED = "WEIGHTED",
}

export class CreatePromotionDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsEnum(DiscountType)
  discount_type: DiscountType;

  @IsNotEmpty()
  @IsDateString()
  start_date: Date;

  @IsNotEmpty()
  @IsDateString()
  end_date: Date;

  @IsOptional()
  @IsNumber()
  discount_value?: number;

  @IsOptional()
  @IsNumber()
  min_weight?: number;

  @IsOptional()
  @IsNumber()
  max_weight?: number;

  @IsOptional()
  @IsNumber()
  unit_price?: number;

  @IsOptional()
  @IsString()
  row_status?: string;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @IsNumber({}, { each: true })
  products?: number[];
}
