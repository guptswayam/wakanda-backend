import { ForbiddenException } from "@nestjs/common"
import { Request } from "express"

export function SuperheroRestrictTo(...roles: string[]) {
  return function(target: any, name: string | symbol, descriptor: PropertyDescriptor) {
    descriptor.value = function(req: Request, ...args: any[]) {
      if(!roles.includes(req.user.superhero.level))
        throw new ForbiddenException("You are not allowed to perform this action!")
      descriptor.value.apply(this, [req, ...args])
    }
  }
}