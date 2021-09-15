import { BadRequestException, ForbiddenException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Debrief } from "src/entities/debrief.entity";
import { User } from "src/entities/user.entity";
import { EntityManager, getConnection, Repository } from "typeorm";
import { MissionService } from "../missions/mission.service";
import { SuperheroService } from "../superheroes/superhero.service";
import { ApproveDebriefDTO } from "./dto/approveDebrief.dto";
import {CreateDebriefDTO } from "./dto/createDebrief.dto";

@Injectable()
export class DebriefService{
  entityManager: EntityManager
  constructor(@InjectRepository(Debrief) private readonly debriefRepo: Repository<Debrief>, private readonly superheroService: SuperheroService, private readonly missionService: MissionService) {
    this.entityManager = getConnection().manager
  }

  async createDebrief(data:CreateDebriefDTO, user: User, entityManager: EntityManager) {
    const superhero = await this.superheroService.findSuperheroOrThrowError({id: user.superhero.id})

    const mission = await this.missionService.findMissionOrThrowError({id: data.missionId})
    
    const debrief = new Debrief()
    debrief.mission = mission
    debrief.superhero = superhero
    debrief.report = data.report
    debrief.status = data.status
    debrief.comment = data.comment

    await entityManager.save(debrief)

    return debrief

  }

  async getDebriefs(user: User) {
    let query: string;
    let params : any[] = []
    if(user.agent.clearenceLevel==="agent"){
      query = `SELECT d.* from superheroes s join debriefs d on d."superheroId" = s.id and s."handlerId"=$1`
      params = [user.agent.id]
    }
    else{
      query = `select * from debriefs`
    }

    return this.entityManager.query(
      query, params
    )
  }

  async getMyDebriefs(user: User) {
    const query = `SELECT * from debriefs where "superheroId"=$1`;
    const params = [user.superhero.id]

    return this.entityManager.query(query, params)

  }

  async approveDebrief(data: ApproveDebriefDTO, user: User) {
    const debrief = await this.findDebriefOrThrowError({id: data.id, relations: ["superhero"]})

    if(user.agent.clearenceLevel==="agent"){
      const superhero = await this.superheroService.findSuperheroOrThrowError({id: debrief.superhero.id, relations: ["handler"]})
      if(superhero.handler.id !== user.agent.id)
        throw new ForbiddenException("You are not allowed to update this brief!")
    }

    debrief.comment = data.comment;
    debrief.status = data.status

    await this.debriefRepo.save(debrief)
    
    return debrief

  }

  async findDebriefOrThrowError(params: any) {
    const debrief = this.debriefRepo.findOne(params)
    if(!debrief){
      throw new BadRequestException("Invalid Debrief Id!")
    }
    return debrief;
  }

}