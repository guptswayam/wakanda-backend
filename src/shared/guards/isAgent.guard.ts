import { Injectable, CanActivate, ExecutionContext, HttpException } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';


async function validateRequest(req: Request) {

  if(!req.user.agent)
    throw new HttpException("You are not allowed to access this route!", 403)

  return true
  
}


@Injectable()
export class IsAgent implements CanActivate {
  roles: String[]
  constructor(...roles: String[]) {
    this.roles = roles;
  }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return validateRequest(request);
  }
}