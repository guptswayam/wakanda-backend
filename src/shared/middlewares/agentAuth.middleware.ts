import { ForbiddenException, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class IsAgent implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if(!req.user.agent){
      throw new ForbiddenException("You are not allowed to access this route")
    }
    next()
  }
}

export function agentRestrictTo(...roles: string[]) {

  return (req: Request, res: Response, next: NextFunction) => {
    if(!roles.includes(req.user.agent.clearenceLevel)) {
      throw new ForbiddenException("You are not allowed to perform this action")
    }
    next()
  }
}