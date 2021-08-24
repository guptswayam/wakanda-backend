import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agent } from 'src/entities/agent.entity';
import { User } from 'src/entities/user.entity';
import { UserService } from '../users/user.service';
import { AgentController } from './agent.controller';
import { AgentService } from './agent.service';

@Module({
  imports: [TypeOrmModule.forFeature([Agent, User])],
  controllers: [AgentController],
  providers: [AgentService, UserService]
})
export class AgentModule {}
