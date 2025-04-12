import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { PromotionsService } from "./promotions.service";
import { CreatePromotionDto } from "./dto/create-promotions.dto";
import { UpdatePromotionsDto } from "./dto/update-promotions.dto";

@Controller("promotions")
export class PromotionsController {
  constructor(private readonly promotionService: PromotionsService) {}

  @Get()
  async findAll(
    @Query("page") page: number = 1,
    @Query("limit") limit: number = 10,
  ) {
    return this.promotionService.findAll({ page, limit });
  }

  @Post()
  async create(@Body() promotion: CreatePromotionDto) {
    return this.promotionService.create(promotion);
  }

  @Get(":id")
  async findOne(@Param("id", ParseIntPipe) id: number) {
    return this.promotionService.findOne(id);
  }

  @Patch(":id")
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateData: UpdatePromotionsDto,
  ) {
    return this.promotionService.update(id, updateData);
  }

  @Patch("/updateStatus/:id")
  async updateStatus(
    @Param("id", ParseIntPipe) id: number,
    @Body("row_status", ParseIntPipe) row_status: string,
  ) {
    return this.promotionService.updateStatus(id, row_status);
  }

  @Delete(":id")
  async delete(@Param("id", ParseIntPipe) id: number) {
    return this.promotionService.delete(id);
  }
}
