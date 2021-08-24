import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Mission } from "src/entities/mission.entity";
import { User } from "src/entities/user.entity";
import { agentRestrictTo, IsAgent } from "src/shared/middlewares/agentAuth.middleware";
import { AuthMiddleware } from "src/shared/middlewares/auth.middleware";
import { UserService } from "../users/user.service";
import { MissionController } from "./mission.controller";
import { MissionService } from "./mission.service";


@Module({
  imports: [TypeOrmModule.forFeature([Mission, User])],
  controllers: [MissionController],
  providers: [MissionService, UserService]
})
export class MissionModule implements NestModule {
  configure(consumer: MiddlewareConsumer){

    consumer.apply(AuthMiddleware, IsAgent, agentRestrictTo("director", "commander"))
    .forRoutes({path: "/missions", method: RequestMethod.POST})

    consumer.apply(AuthMiddleware)
    .forRoutes("/missions")
  }
}