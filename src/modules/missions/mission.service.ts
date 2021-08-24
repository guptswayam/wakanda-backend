import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Mission } from "src/entities/mission.entity";
import { Repository } from "typeorm";
import { CreateMissionDTO } from "./dto/createMission.dto";

@Injectable()
export class MissionService {
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
    return this.missionRepo.find()
  }

  async softDeleteMission(id: string) {
    return this.missionRepo.softDelete({id})
  }

}