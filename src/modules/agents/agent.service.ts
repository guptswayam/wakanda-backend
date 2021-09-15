import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Agent } from 'src/entities/agent.entity';
import { User } from 'src/entities/user.entity';
import { generateToken } from 'src/shared/utils/utility';
import { Repository } from 'typeorm';
import { UserService } from '../users/user.service';
import { AgentLoginDTO } from './dto/agentLogin.dto';
import { CreateAgentDTO } from './dto/createAgent.dto';
import jwt from "jsonwebtoken"
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AgentService {

  constructor(@InjectRepository(Agent) private readonly agentRepo: Repository<Agent>, private readonly userService: UserService, private readonly configService: ConfigService) {}

  async createAgent(data: CreateAgentDTO) {
    await this.userService.duplicateUserCheck(data.id)

    const agent = new Agent()

    if(!data.clearenceLevel || data.clearenceLevel === "agent"){
      if(!data.managerId)
        throw new BadRequestException("Please also send the managerId!")
      agent.manager = await this.getAgent({id: data.managerId})
    }


    agent.clearenceLevel = data.clearenceLevel
    agent.contactNumber = data.contactNumber

    await this.agentRepo.save(agent)

    await this.userService.createUser({...data, agent: agent})
  

    return agent

  }

  async getAgent(params: any) {
    const agent = await this.agentRepo.findOne(params)

    if(!agent)
      throw new BadRequestException("Invalid Agent Id!")

    return agent
  }
  
  async login(data: AgentLoginDTO) {
    let user: User;
    try {
      user = await this.userService.findUserOrThrowError({id: data.id, password: data.password})
    } catch (error) {
      throw new BadRequestException("Invalid Id or password")
    }
    if(!user.agent)
      throw new ForbiddenException("You are not allowed to login as agent!")
    

    // const token = generateToken(user)
    const JWT_CONFIG = this.configService.get("jwt")
    const token = jwt.sign({id: user.id}, JWT_CONFIG.jwtSecret, {expiresIn: JWT_CONFIG.jwtExpresIn})
    

    return {data: token}
    

  }

}
