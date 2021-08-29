import { IsNotEmpty, Length } from "class-validator"

export class AgentLoginDTO {
  @IsNotEmpty()
  id: string
  @IsNotEmpty()
  @Length(4)
  password: string
}