import { Body, Controller, Delete, Get, Logger, Param, ParseUUIDPipe, Post, Req, UseGuards, UsePipes } from "@nestjs/common";
import { Request } from "express";
import { AuthGuard } from "src/shared/guards/auth.guard";
import { RestrictAgent } from "src/shared/guards/restrictAgent.guard";
import { IsAgent } from "src/shared/middlewares/agentAuth.middleware";
import { ValidationPipe } from "src/shared/pipes/validation.pipe";
import { CreateMissionDTO } from "./dto/createMission.dto";
import { MissionService } from "./mission.service";

@Controller("missions")
export class MissionController {
  constructor(private readonly missionService: MissionService) {}


  @UsePipes(new ValidationPipe())
  @Post()
  // @AgentRestrictTo("director", "commander")
  @UseGuards(AuthGuard, IsAgent, new RestrictAgent("director", "commander"))
  createMission(@Req() req: Request, @Body() data: CreateMissionDTO) {
    return this.missionService.createMission(data)
  }

  
  @Get()
  @UseGuards(AuthGuard)
  getMission() {
    return this.missionService.getMissions()
  }

  @Delete(":id")
  async deleteMission(@Param('id', ParseUUIDPipe) id: string) {
    const deletedResult = await this.missionService.softDeleteMission(id)

    return deletedResult
  }

}