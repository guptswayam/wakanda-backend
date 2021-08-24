import { IsEnum, IsNotEmpty, IsOptional, IsUUID, Length } from "class-validator"

export class CreateAgentDTO {
  @IsNotEmpty()
  email: string

  @IsNotEmpty()
  id: string

  @IsNotEmpty()
  @Length(4)
  password: string

  @IsNotEmpty()
  @Length(10, 10)
  contactNumber: string
  
  @IsEnum(["director", "commander", "agent", undefined])
  clearenceLevel: string

  @IsUUID()
  @IsOptional()
  managerId?: string

}