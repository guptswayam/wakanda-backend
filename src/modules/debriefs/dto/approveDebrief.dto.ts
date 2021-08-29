import { IsEnum, IsNotEmpty, IsUUID } from "class-validator";

export class ApproveDebriefDTO {
  @IsNotEmpty()
  comment: string

  @IsEnum(["accepted", "rejected"])
  status: string
  
  @IsUUID()
  id: string

}