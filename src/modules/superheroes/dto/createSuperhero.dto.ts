import { IsEnum, IsNotEmpty, IsUUID, Length } from "class-validator";

export class CreateSuperheroDTO {
  @IsNotEmpty()
  email: string

  @IsNotEmpty()
  id: string

  @IsNotEmpty()
  @Length(4)
  password: string

  @IsNotEmpty()
  caid: string

  @IsNotEmpty()
  college: string

  @IsNotEmpty()
  branch: string

  @IsNotEmpty()
  gradYear: string

  @IsEnum(["inductee", "soldier", "avenger", undefined])
  level: string

  @IsNotEmpty()
  @IsUUID()
  handlerId: string


}