import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { ErrorLogger } from "../../../utils/error-logger";
import { paginate, PaginatedResult } from "../../helpers/helpers";
import { CreatePromotionDto } from "./dto/create-promotions.dto";
import { UpdatePromotionsDto } from "./dto/update-promotions.dto";

@Injectable()
export class PromotionsService {
  constructor(
    private prisma: PrismaService,
    private errorLogger: ErrorLogger,
  ) {}

  async findAll(_paginate: {
    page?: number;
    limit?: number;
  }): Promise<PaginatedResult<any>> {
    try {
      return await paginate(
        this.prisma.promotions.findMany.bind(this.prisma.promotions),
        this.prisma.promotions.count.bind(this.prisma.promotions),
        { page: _paginate.page, limit: _paginate.limit },
        {
          orderBy: { createdAt: "desc" },
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

  async create(promotionData: CreatePromotionDto) {
    try {
      const existingPromotionProducts = await this.prisma.products.findMany({
        where: {
          id: { in: promotionData.products },
          promotionId: { not: null },
        },
        select: {
          id: true,
          name: true,
          promotion: { select: { id: true, title: true } },
        },
      });

      if (existingPromotionProducts.length > 0) {
        const conflictDetails = existingPromotionProducts.map((p) => ({
          productId: p.id,
          productName: p.name,
          currentPromotion: p.promotion,
        }));

        throw new ConflictException({
          message: "Selected products are already in another promotion",
          conflicts: conflictDetails,
        });
      }

      return this.prisma.promotions.create({
        data: {
          ...promotionData,
          products: {
            connect: promotionData.products.map((id) => ({ id })),
          },
        },
        include: {
          products: true,
        },
      });
    } catch (error) {
      await this.errorLogger.errorlogger({
        errorMessage: "Error creating promotion",
        errorStack: error,
        context: "PromotionService - create",
      });

      if (error instanceof ConflictException) throw error;

      throw new InternalServerErrorException("Failed to create promotion");
    }
  }
  async findOne(id: number) {
    try {
      return await this.prisma.promotions.findUnique({
        where: { id },
        include: {
          products: {
            where: { row_status: "1" },
          },
        },
      });
    } catch (error) {
      await this.errorLogger.errorlogger({
        errorMessage: "An error occurred while retrieving the product",
        errorStack: error,
        context: "PromotionService - findOne",
      });
      throw error;
    }
  }

  async update(id: number, updateData: UpdatePromotionsDto) {
    try {
      const existingPromotionProducts = await this.prisma.products.findMany({
        where: {
          id: { in: updateData.products },
          promotionId: { not: null },
        },
        select: {
          id: true,
          name: true,
          promotion: { select: { id: true, title: true } },
        },
      });

      if (existingPromotionProducts.length > 0) {
        const conflictDetails = existingPromotionProducts.map((p) => ({
          productId: p.id,
          productName: p.name,
          currentPromotion: p.promotion,
        }));

        throw new ConflictException({
          message: "Selected products are already in another promotion",
          conflicts: conflictDetails,
        });
      }
      return await this.prisma.promotions.update({
        where: { id },
        data: {
          ...updateData,
          products: {
            connect: updateData.products.map((id) => ({ id })),
          },
        },
      });
    } catch (error) {
      await this.errorLogger.errorlogger({
        errorMessage: "An error occurred while updating the product",
        errorStack: error,
        context: "PromotionService - update",
      });
      throw error;
    }
  }

  async updateStatus(id: number, row_status: string) {
    try {
      return await this.prisma.promotions.update({
        where: { id },
        data: { row_status: String(row_status) },
      });
    } catch (error) {
      await this.errorLogger.errorlogger({
        errorMessage: "An error occurred while updating product status",
        errorStack: error,
        context: "PromotionService - updateStatus",
      });
      throw error;
    }
  }

  async delete(id: number) {
    try {
      return await this.prisma.promotions.delete({
        where: { id },
      });
    } catch (error) {
      await this.errorLogger.errorlogger({
        errorMessage: "An error occurred while deleting the product",
        errorStack: error,
        context: "PromotionService - delete",
      });
      throw error;
    }
  }
}
