import e from "express";
import { monsterGender, monsterNationality, monsterTitle } from "../enums";
import { ApiProperty } from "@nestjs/swagger";
import { IsDecimal, IsEnum, IsInt, IsNumber, IsString, IsUrl } from 'class-validator';

export class CreateMonsterDto {
    @ApiProperty()
    @IsString()
    firstName: string;

    @ApiProperty()
    @IsString()
    lastName: string;

    @ApiProperty()
    @IsEnum(monsterTitle)
    title: monsterTitle;

    @ApiProperty()
    @IsEnum(monsterGender)
    gender: monsterGender;

    @ApiProperty()
    @IsString()
    description: String;

    @ApiProperty()
    @IsEnum(monsterNationality, { each: true })
    nationality: monsterNationality[];

    @ApiProperty()
    @IsUrl()
    @IsString()
    imageUrl: String;

    @ApiProperty()
    @IsInt()
    goldBalance: Number;

    @ApiProperty()
    @IsNumber({ maxDecimalPlaces: 2 })
    speed: Number;

    @ApiProperty()
    @IsNumber({ maxDecimalPlaces: 2 })
    Health: Number;

    @ApiProperty()
    @IsString()
    secretNotes: String;

    @ApiProperty()
    @IsString()
    monsterPassword: String;
}

