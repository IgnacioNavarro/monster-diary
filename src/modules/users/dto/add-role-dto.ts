import { ApiProperty } from "@nestjs/swagger";
import { userRole } from "../roles.enum";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";

export class AddRoleDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    id: string;

    @ApiProperty()
    @IsEnum(userRole, { each: true })
    @IsNotEmpty()
    roles: userRole[];
}

