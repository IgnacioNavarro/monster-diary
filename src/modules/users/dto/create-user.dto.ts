import { IsEnum, IsString } from "class-validator";
import { userRole } from "../roles";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {

    @ApiProperty()
    @IsString()
    username: string;

    @ApiProperty()
    @IsString()
    password: string;

    @ApiProperty()
    @IsEnum(userRole)
    role: userRole;
}
