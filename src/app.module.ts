import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SuperheroModule } from './modules/superheroes/superhero.module';
import { UserModule } from './modules/users/user.module';
import { AgentModule } from './modules/agents/agent.module';
import * as ormConfig from "./../ormConfig.json"
import { MissionModule } from './modules/missions/mission.module';
import { DebriefModule } from './modules/debriefs/debrief.module';

@Module({
  imports: [TypeOrmModule.forRoot(ormConfig as object), UserModule, SuperheroModule, AgentModule, MissionModule, DebriefModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
