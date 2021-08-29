import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ValidationPipe } from 'src/shared/pipes/validation.pipe';
import { AgentService } from './agent.service';
import { AgentLoginDTO } from './dto/agentLogin.dto';
import { CreateAgentDTO } from './dto/createAgent.dto';

@Controller('agents')
export class AgentController {
  constructor(private readonly agentService: AgentService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  createAgent(@Body() data: CreateAgentDTO) {
    return this.agentService.createAgent(data)
  }

  @UsePipes(new ValidationPipe())
  @Post("login")
  login(@Body() data: AgentLoginDTO) {
    return this.agentService.login(data)
  }

}
