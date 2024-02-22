import { ApiProperty, OmitType, PartialType, PickType } from '@nestjs/swagger';
import { CreateMonsterDto } from './create-monster.dto';
import { monsterGender, monsterNationality, monsterTitle } from '../utils';
import { IsEnum, IsNumber, IsString, IsUrl } from 'class-validator';
import { Exclude } from 'class-transformer';

export class UpdateMonsterDto extends PartialType(OmitType(CreateMonsterDto, ['goldBalance'] as const)){}
