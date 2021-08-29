import { IsEnum, IsNotEmpty, IsUUID } from "class-validator";

export class CreateDebriefDTO {
  @IsEnum(["claimed", undefined])
  status: string

  @IsNotEmpty()
  report: string

  @IsUUID()
  missionId: string

}