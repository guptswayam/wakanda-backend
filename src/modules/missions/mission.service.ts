import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Mission } from "src/entities/mission.entity";
import { Repository } from "typeorm";
import { CreateMissionDTO } from "./dto/createMission.dto";

@Injectable()
export class MissionService {
  private readonly logger = new Logger(MissionService.name)
  constructor(@InjectRepository(Mission) private readonly missionRepo: Repository<Mission>) {}

  async createMission(data: CreateMissionDTO) {
    const mission = new Mission()

    mission.brief = data.brief;
    mission.points = data.points;
    mission.minLevel = data.minLevel;
    mission.name = data.name
    
    await this.missionRepo.save(mission)

    return mission

  }

  async getMissions() {
    this.logger.log("Fetching Misssions...")
    return this.missionRepo.find()
  }

  async softDeleteMission(id: string) {
    return this.missionRepo.softDelete({id})
  }

  async findMissionOrThrowError(params: any) {
    const mission = this.missionRepo.findOne(params)
    if(!mission){
      throw new BadRequestException("Invalid Mission Id!")
    }
    return mission;
  }

}