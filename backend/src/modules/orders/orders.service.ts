import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { ErrorLogger } from "../../../utils/error-logger";
import { paginate, PaginatedResult } from "../../helpers/helpers";
import { CreateOrdersDto } from "./dto/create-orders.dto";

@Injectable()
export class OrdersService {
  constructor(
    private prisma: PrismaService,
    private errorLogger: ErrorLogger,
  ) {}

  async findAllAvailableProducts(_paginate: {
    page?: number;
    limit?: number;
  }): Promise<PaginatedResult<any>> {
    try {
      const whereCondition = {
        row_status: "1",
      };

      const includeCondition = {
        promotion: {
          where: {
            row_status: "1",
          },
          select: {
            id: true,
            title: true,
            discount_type: true,
            discount_value: true,
            start_date: true,
            end_date: true,
            min_weight: true,
            max_weight: true,
            unit_price: true,
          },
        },
      };

      return await paginate(
        this.prisma.products.findMany.bind(this.prisma.products),
        this.prisma.products.count.bind(this.prisma.products, {
          where: whereCondition,
        }),
        { page: _paginate.page, limit: _paginate.limit },
        {
          where: whereCondition,
          include: includeCondition,
          orderBy: { createdAt: "desc" },
        },
      );
    } catch (error) {
      await this.errorLogger.errorlogger({
        errorMessage: "An error occurred while retrieving available products",
        errorStack: error,
        context: "PromotionService - findAllAvailableProducts",
      });
      throw error;
    }
  }

  async createOrder(ordersDto: CreateOrdersDto) {
    const productIds = ordersDto.items.map((item) => item.productId);

    const products = await this.prisma.products.findMany({
      where: { id: { in: productIds } },
      select: { id: true, price: true, promotion: true },
    });

    if (products.length !== productIds.length) {
      const missingIds = productIds.filter(
        (id) => !products.some((p) => p.id === id),
      );
      throw new Error(`Products not found: ${missingIds.join(", ")}`);
    }

    const preparedItems = await Promise.all(
      ordersDto.items.map(async (item) => {
        const product = products.find((p) => p.id === item.productId)!;
        const price = item.price ?? product.price;
        const discount = item.discount ?? 0;

        return {
          ...item,
          price,
          discount,
          subtotal: price * item.quantity,
          itemDiscount: discount * item.quantity,
        };
      }),
    );
    console.log("preparedItems", preparedItems);

    return await this.prisma.$transaction(async (prisma) => {
      const order = await prisma.orders.create({
        data: {
          userId: ordersDto.userId,
          subtotal: ordersDto.subtotal,
          total_discount: ordersDto.total_discount,
          grand_total: ordersDto.grand_total,
        },
      });

      const orderItems = await Promise.all(
        preparedItems.map((item) =>
          prisma.orderItem.create({
            data: {
              orderId: order.id,
              productId: item.productId,
              quantity: item.quantity,
              price: item.price,
              discount: item.discount,
            },
            include: {
              product: {
                select: {
                  name: true,
                  description: true,
                },
              },
            },
          }),
        ),
      );

      return {
        ...order,
        items: orderItems,
      };
    });
  }

  async findAll(_paginate: {
    page?: number;
    limit?: number;
  }): Promise<PaginatedResult<any>> {
    try {
      const findManyOptions = {
        select: {
          id: true,
          quantity: true,
          price: true,
          discount: true,
          createdAt: true,
          orderId: true,
          productId: true,
          order: {
            select: {
              id: true,
              subtotal: true,
              total_discount: true,
              grand_total: true,
              createdAt: true,
              user: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                },
              },
            },
          },
          product: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        orderBy: { createdAt: "desc" } as const,
      };

      const countOptions = {};

      return await paginate(
        this.prisma.orderItem.findMany.bind(this.prisma.orderItem),
        this.prisma.orderItem.count.bind(this.prisma.orderItem),
        { page: _paginate.page, limit: _paginate.limit },
        {
          ...findManyOptions,
          ...countOptions,
        },
      );
    } catch (error) {
      await this.errorLogger.errorlogger({
        errorMessage: "An error occurred while fetching products",
        errorStack: error,
        context: "PromotionService - findAll",
      });
      throw error;
    }
  }
}
