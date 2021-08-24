import { IsNotEmpty, Length } from "class-validator"
import { Agent } from "src/entities/agent.entity"
import { Superhero } from "src/entities/superhero.entity"

export class CreateUserDTO {
  @IsNotEmpty()
  email: string
  @Length(4)
  @IsNotEmpty()
  password: string
  @IsNotEmpty()
  id: string

  superhero?: Superhero
  agent?: Agent

}

