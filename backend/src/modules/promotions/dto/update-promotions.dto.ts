import { PartialType } from "@nestjs/mapped-types";
import { CreatePromotionDto } from "./create-promotions.dto";

export class UpdatePromotionsDto extends PartialType(CreatePromotionDto) {}
