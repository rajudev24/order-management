import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Patch,
  Delete,
  ParseIntPipe,
  Query,
  ParseEnumPipe,
} from "@nestjs/common";
import { ProductsService } from "./products.service";
import { CreateProductsDto } from "./dto/create-products.dto";
import { UpdateProductsDto } from "./dto/update-products.dto";

@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findAll(
    @Query("page") page: number = 1,
    @Query("limit") limit: number = 10,
  ) {
    console.log("get all products");
    return this.productsService.findAll({ page, limit });
  }

  @Post()
  async create(@Body() product: CreateProductsDto) {
    return this.productsService.create(product);
  }

  @Get(":id")
  async findOne(@Param("id", ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }

  @Patch(":id")
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateData: UpdateProductsDto,
  ) {
    return this.productsService.update(id, updateData);
  }

  @Patch("/updateStatus/:id")
  async updateStatus(
    @Param("id", ParseIntPipe) id: number,
    @Body("row_status", ParseIntPipe) row_status: string,
  ) {
    return this.productsService.updateStatus(id, row_status);
  }

  @Delete(":id")
  async delete(@Param("id", ParseIntPipe) id: number) {
    return this.productsService.delete(id);
  }
}
