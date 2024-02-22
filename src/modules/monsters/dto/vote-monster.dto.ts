import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";

export class voteMonsterDto {
    
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  username: string;
}