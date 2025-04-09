import { Module } from "@nestjs/common";
import { AuthModule } from "./apps/auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "./modules/prisma/prisma.module";
import { SharedModule } from "./modules/shared.module";
import { ProductsModule } from "./modules/products/products.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    PrismaModule,
    SharedModule,
    ProductsModule,
  ],
  providers: [AuthModule, PrismaModule],
})
export class AppModule {}
