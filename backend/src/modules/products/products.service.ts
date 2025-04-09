import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateProductsDto } from "./dto/create-products.dto";
import { ErrorLogger } from "../../../utils/error-logger";
import { UpdateProductsDto } from "./dto/update-products.dto";

@Injectable()
export class ProductsService {
  constructor(
    private prisma: PrismaService,
    private errorLogger: ErrorLogger,
  ) {}

  async findAll(_paginate: { page?: number; limit?: number }) {
    try {
      const page =
        _paginate.page && _paginate.page > 0 ? Number(_paginate.page) : 1;
      const limit =
        _paginate.limit && _paginate.limit > 0
          ? Math.min(Number(_paginate.limit), 500)
          : 10;
      const skip = (page - 1) * limit;

      const [data, total] = await Promise.all([
        this.prisma.products.findMany({
          skip,
          take: limit,
        }),
        this.prisma.products.count(),
      ]);

      const extraData = {
        total_items: total,
        total_pages: Math.ceil(total / limit),
      };
      console.log("data", data);
      return {
        items: data,
        ...extraData,
        paginate: {
          total: total,
          per_page: limit,
          current_page: page,
        },
      };
    } catch (error) {
      await this.errorLogger.errorlogger({
        errorMessage: "An error occurred while fetching products",
        errorStack: error,
        context: "ProductService - findAll",
      });
      throw error;
    }
  }

  async create(productData: CreateProductsDto) {
    try {
      return await this.prisma.products.create({
        data: productData,
      });
    } catch (error) {
      return await this.errorLogger.errorlogger({
        errorMessage: "An error occurred while logging in",
        errorStack: error,
        context: "AuthService - login",
      });
    }
  }
  async findOne(id: number) {
    try {
      return await this.prisma.products.findUnique({
        where: { id },
      });
    } catch (error) {
      await this.errorLogger.errorlogger({
        errorMessage: "An error occurred while retrieving the product",
        errorStack: error,
        context: "ProductService - findOne",
      });
      throw error;
    }
  }

  async update(id: number, updateData: UpdateProductsDto) {
    try {
      return await this.prisma.products.update({
        where: { id },
        data: updateData,
      });
    } catch (error) {
      await this.errorLogger.errorlogger({
        errorMessage: "An error occurred while updating the product",
        errorStack: error,
        context: "ProductService - update",
      });
      throw error;
    }
  }

  async updateStatus(id: number, row_status: string) {
    try {
      return await this.prisma.products.update({
        where: { id },
        data: { row_status: String(row_status) },
      });
    } catch (error) {
      await this.errorLogger.errorlogger({
        errorMessage: "An error occurred while updating product status",
        errorStack: error,
        context: "ProductService - updateStatus",
      });
      throw error;
    }
  }

  async delete(id: number) {
    try {
      return await this.prisma.products.delete({
        where: { id },
      });
    } catch (error) {
      await this.errorLogger.errorlogger({
        errorMessage: "An error occurred while deleting the product",
        errorStack: error,
        context: "ProductService - delete",
      });
      throw error;
    }
  }
}
