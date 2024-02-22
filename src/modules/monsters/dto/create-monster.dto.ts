import e from "express";
import { monsterGender, monsterNationality, monsterTitle, monsterVotes } from "../utils";
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
    description: string;

    @ApiProperty()
    @IsEnum(monsterNationality, { each: true })
    nationality: monsterNationality[];

    @ApiProperty()
    @IsUrl()
    @IsString()
    imageUrl: string;

    @ApiProperty()
    @IsInt()
    goldBalance: number;

    @ApiProperty()
    @IsNumber({ maxDecimalPlaces: 2 })
    speed: number;

    @ApiProperty()
    @IsNumber({ maxDecimalPlaces: 2 })
    Health: number;

    @ApiProperty()
    @IsString()
    secretNotes: string;

    @ApiProperty()
    @IsString()
    monsterPassword: string;

    @ApiProperty()
    votes: string[];
}

