import { ForbiddenException } from "@nestjs/common"
import { Request } from "express"

export function AgentRestrictTo(...roles: string[]) {
  return function(target: any, name: string | symbol, descriptor: PropertyDescriptor) {
    const func = descriptor.value
    descriptor.value = function(req: Request, ...args: any[]) {
      console.log("ASDSE")
      if(!roles.includes(req.user.agent.clearenceLevel))
        throw new ForbiddenException("You are not allowed to perform this action!")
      return func.apply(this, [req, ...args])
    }
  }
}