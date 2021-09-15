import { Body, Controller, Get, Post, Req, UsePipes } from "@nestjs/common";
import { Request } from "express";
import { ValidationPipe } from "src/shared/pipes/validation.pipe";
import { EntityManager, Transaction, TransactionManager } from "typeorm";
import { DebriefService } from "./debrief.service";
import { ApproveDebriefDTO } from "./dto/approveDebrief.dto";
import { CreateDebriefDTO } from "./dto/createDebrief.dto";

@Controller("debriefs")
export class DebriefController {
  constructor(private readonly debriefService: DebriefService) {}

  @Get()
  getDebriefs(@Req() req: Request) {
    console.log(req.user)
    return this.debriefService.getDebriefs(req.user)
  }

  @UsePipes(new ValidationPipe())
  @Post()
  @Transaction()
  createDebrief(@Req() req: Request, @Body() data: CreateDebriefDTO, @TransactionManager() entityManager: EntityManager) {
    return this.debriefService.createDebrief(data, req.user, entityManager)
  }

  @UsePipes(new ValidationPipe())
  @Post("approve")
  approveDebrief(@Req() req: Request, @Body() data: ApproveDebriefDTO) {
    return this.debriefService.approveDebrief(data, req.user)
  }

  @Get("mine")
  getMyDebriefs(@Req() req: Request) {
    return this.debriefService.getMyDebriefs(req.user)
  }

}