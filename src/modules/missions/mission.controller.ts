import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Req, UsePipes } from "@nestjs/common";
import { Request } from "express";
import { ValidationPipe } from "src/shared/pipes/validation.pipe";
import { CreateMissionDTO } from "./dto/createMission.dto";
import { MissionService } from "./mission.service";

@Controller("missions")
export class MissionController {
  constructor(private readonly missionService: MissionService) {}


  @UsePipes(new ValidationPipe())
  @Post()
  // @AgentRestrictTo("director", "commander")
  createMission(@Req() req: Request, @Body() data: CreateMissionDTO) {
    return this.missionService.createMission(data)
  }

  @Get()
  getMission() {
    return this.missionService.getMissions()
  }

  @Delete(":id")
  async deleteMission(@Param('id', ParseUUIDPipe) id: string) {
    const deletedResult = await this.missionService.softDeleteMission(id)

    return deletedResult
  }

}