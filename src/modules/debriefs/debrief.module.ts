import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agent } from 'src/entities/agent.entity';
import { Debrief } from 'src/entities/debrief.entity';
import { Mission } from 'src/entities/mission.entity';
import { Superhero } from 'src/entities/superhero.entity';
import { User } from 'src/entities/user.entity';
import { IsAgent } from 'src/shared/middlewares/agentAuth.middleware';
import { AuthMiddleware } from 'src/shared/middlewares/auth.middleware';
import { IsSuperhero } from 'src/shared/middlewares/superheroAuth.middleware';
import { AgentService } from '../agents/agent.service';
import { MissionService } from '../missions/mission.service';
import { SuperheroService } from '../superheroes/superhero.service';
import { UserService } from '../users/user.service';
import { DebriefController } from './debrief.controller';
import { DebriefService } from './debrief.service';

@Module({
  imports: [TypeOrmModule.forFeature([Superhero, Mission, Debrief, User, Agent])],
  controllers: [DebriefController],
  providers: [SuperheroService, DebriefService, MissionService, UserService, AgentService]
})
export class DebriefModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware, IsSuperhero).forRoutes({path: "/debriefs", method: RequestMethod.POST}, "/debriefs/mine")
    consumer.apply(AuthMiddleware, IsAgent).forRoutes("/debriefs/approve", {path: "/debriefs", method: RequestMethod.GET})
  }
  
}
