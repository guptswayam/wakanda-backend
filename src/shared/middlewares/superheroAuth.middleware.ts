import { ForbiddenException, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class IsSuperhero implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if(!req.user.superhero){
      throw new ForbiddenException("You are not allowed to access this route!")
    }
    next()
  }
}

export function superheroRestrictTo(...roles: string[]) {

  return (req: Request, res: Response, next: NextFunction) => {
    if(!roles.includes(req.user.superhero.level)) {
      throw new ForbiddenException("You are not allowed to perform this action")
    }
    next()
  }
}