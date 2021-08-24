import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Agent } from "src/entities/agent.entity";
import { Superhero } from "src/entities/superhero.entity";
import { User } from "src/entities/user.entity";
import { AuthMiddleware } from "src/shared/middlewares/auth.middleware";
import { IsSuperhero } from "src/shared/middlewares/superheroAuth.middleware";
import { AgentService } from "../agent/agent.service";
import { UserService } from "../users/user.service";
import { SuperheroController } from "./superhero.controller";
import { SuperheroService } from "./superhero.service";

@Module({
  imports: [TypeOrmModule.forFeature([Superhero, User, Agent])],
  controllers: [SuperheroController],
  providers: [SuperheroService, UserService, AgentService]
})
export class SuperheroModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware, IsSuperhero)
    .forRoutes("/superheroes/me")
  }
}