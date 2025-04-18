import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { RedisModule } from "../../modules/redis/redis.module";

@Module({
  imports: [RedisModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
