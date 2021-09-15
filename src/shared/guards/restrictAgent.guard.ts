import { Injectable, CanActivate, ExecutionContext, HttpException } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';


async function validateRequest(req: Request, roles: String[]) {

  if(!roles.includes(req.user.agent.clearenceLevel))
    throw new HttpException("Not Allowed!", 403)

  return true
  
}


@Injectable()
export class RestrictAgent implements CanActivate {
  roles: String[]
  constructor(...roles: String[]) {
    this.roles = roles;
  }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return validateRequest(request, this.roles);
  }
}