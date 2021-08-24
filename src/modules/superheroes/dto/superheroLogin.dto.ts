import { IsNotEmpty, Length } from "class-validator"

export class SuperheroLoginDTO {
  @IsNotEmpty()
  id: string
  @IsNotEmpty()
  @Length(4)
  password: string
}