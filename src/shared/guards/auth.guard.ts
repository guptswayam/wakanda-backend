import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, Logger } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import jwt from "jsonwebtoken"
import { UserService } from 'src/modules/users/user.service';


async function validateRequest(req: Request, userService: UserService) {
  try {
    let token = req.headers.authorization;

    Logger.verbose("Using Auth Guard!")

    if(!token || !token.startsWith("Bearer "))
      throw "";
    token = token.replace("Bearer ", "")
    
    const payload: any = jwt.verify(token, process.env.SECRET_KEY) 
    const user = await userService.findUserOrThrowError({id: payload.id})
    
    req.user = user

    return true


    
  } catch (error) {
    throw new UnauthorizedException("Invalid Credentials!")
  }
  
}


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return validateRequest(request, this.userService);
  }
}