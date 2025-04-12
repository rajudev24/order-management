import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { CreateOrdersDto } from "./dto/create-orders.dto";

@Controller("orders")
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}
  @Get("/available-products")
  async findAllAvailableProducts(
    @Query("page") page: number = 1,
    @Query("limit") limit: number = 10,
  ) {
    return this.ordersService.findAllAvailableProducts({ page, limit });
  }

  @Post("/create-order")
  async create(@Body() product: CreateOrdersDto) {
    return this.ordersService.createOrder(product);
  }

  @Get("/ordered-items")
  async findAll(
    @Query("page") page: number = 1,
    @Query("limit") limit: number = 10,
  ) {
    return this.ordersService.findAll({ page, limit });
  }
}
