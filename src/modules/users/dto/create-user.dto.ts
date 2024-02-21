import { IsEnum, IsString } from "class-validator";
import { userRole } from "../roles.enum";
import { ApiProperty } from "@nestjs/swagger";
import e from "express";

export class CreateUserDto {

    @ApiProperty()
    @IsString()
    username: string;

    @ApiProperty()
    @IsString()
    password: string;

}
