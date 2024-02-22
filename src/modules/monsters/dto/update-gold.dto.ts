import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNumber, IsPositive, Matches } from "class-validator";

export class UpdateGoldDto {

    @ApiProperty()
    //@IsPositive()
    @IsInt()
    amount: number;
}
