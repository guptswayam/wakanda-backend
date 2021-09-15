import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agent } from 'src/entities/agent.entity';
import { User } from 'src/entities/user.entity';
import { agentRestrictTo, IsAgent } from 'src/shared/middlewares/agentAuth.middleware';
import { AuthMiddleware } from 'src/shared/middlewares/auth.middleware';
import { UserService } from '../users/user.service';
import { AgentController } from './agent.controller';
import { AgentService } from './agent.service';

@Module({
  imports: [TypeOrmModule.forFeature([Agent, User])],
  controllers: [AgentController],
  providers: [AgentService, UserService]
})
export class AgentModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware, IsAgent, agentRestrictTo("commander", "director"))
    .exclude("/agents/login")
    .forRoutes("/agents")
  }
}
