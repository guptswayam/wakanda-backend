import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SuperheroModule } from './modules/superheroes/superhero.module';
import { UserModule } from './modules/users/user.module';
import { AgentModule } from './modules/agents/agent.module';
import { MissionModule } from './modules/missions/mission.module';
import { DebriefModule } from './modules/debriefs/debrief.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import jwtConfig from './config/jwtConfig';
import databaseConfig from './config/database';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => configService.get("database"),
      inject: [ConfigService]
    }),
    UserModule, SuperheroModule, AgentModule, MissionModule, DebriefModule,
    ConfigModule.forRoot({          // we imported ConfigModule Globally, so need to import in every module
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,      // We can either use this or dotenv module
      load: [
        jwtConfig,
        databaseConfig
      ]
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
