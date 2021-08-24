import { BadRequestException, ForbiddenException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Superhero } from "src/entities/superhero.entity";
import { generateToken } from "src/shared/utils/utility";
import { Repository } from "typeorm";
import { AgentService } from "../agent/agent.service";
import { UserService } from "../users/user.service";
import { CreateSuperheroDTO } from "./dto/createSuperhero.dto";
import { SuperheroLoginDTO } from "./dto/superheroLogin.dto";


@Injectable()
export class SuperheroService {

  constructor(@InjectRepository(Superhero) private readonly superheroRepo: Repository<Superhero>, private readonly userService: UserService, private readonly agentService: AgentService) {}

  getSuperheroes() {
    return this.superheroRepo.find({relations: ["user"]})
  }

  async createSuperhero(data: CreateSuperheroDTO) {

    this.userService.duplicateUserCheck(data.id)

    const handler = await this.agentService.getAgent({id: data.handlerId})

    const superhero = new Superhero()
    
    superhero.branch = data.branch
    superhero.caid = data.caid;
    superhero.college = data.college;
    superhero.gradYear = data.gradYear;
    superhero.handler = handler
    superhero.level = data.level


    try {
      await this.superheroRepo.save(superhero)
    } catch (error) {
      if(error.code == "23505")
        throw new BadRequestException(error.detail)
      throw error
    }

    await this.userService.createUser({...data, superhero: superhero})
    
    return superhero

  }


  async login(data: SuperheroLoginDTO) {
    let user;
    try {
      user = await this.userService.findUserOrThrowError({id: data.id, password: data.password})
    } catch (error) {
      throw new BadRequestException("Invalid Id or password")
    }
    if(!user.superhero)
      throw new ForbiddenException("You are not allowed to login as superhero!")
    

    const token = generateToken(user)
    

    return {data: token}
    

  }

}