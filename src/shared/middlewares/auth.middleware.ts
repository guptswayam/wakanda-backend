import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import { UserService } from "src/modules/users/user.service";

@Injectable()
export class AuthMiddleware implements NestMiddleware {

  constructor(private readonly userService: UserService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      let token = req.headers.authorization;

      if(!token || !token.startsWith("Bearer "))
        throw "";
      token = token.replace("Bearer ", "")
      
      const payload: any = jwt.verify(token, process.env.SECRET_KEY) 
      const user = await this.userService.findUserOrThrowError({id: payload.id})
      
      req.user = user

      next()


      
    } catch (error) {
      throw new UnauthorizedException("Invalid Credentials!")
    }

  }
}