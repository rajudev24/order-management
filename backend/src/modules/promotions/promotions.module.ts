import { Module } from "@nestjs/common";
import { PromotionsService } from "./promotions.service";
import { PromotionsController } from "./promotions.controller";

@Module({
  imports: [],
  controllers: [PromotionsController],
  providers: [PromotionsService],
  exports: [],
})
export class PromotionsModule {}
