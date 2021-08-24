import { IsEnum, IsNotEmpty, Length, Max, Min } from "class-validator";

export class CreateMissionDTO {
  @IsNotEmpty()
  @Length(3)
  name: string

  @IsNotEmpty()
  brief: string

  @IsEnum(["inductee", "soldier", "avenger", undefined])
  minLevel: string

  @IsNotEmpty()
  @Max(10)
  @Min(1)
  points: Number


}