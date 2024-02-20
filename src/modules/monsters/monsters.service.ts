import { CreateMonsterDto } from './dto/create-monster.dto';
import { UpdateMonsterDto } from './dto/update-monster.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { Monster } from './schemas/monster.schema';
import { Model } from 'mongoose';

@Injectable()
export class MonstersService {
  constructor(
    @InjectModel(Monster.name)
    private monsterModel: Model<Monster>,
  ) {}

  async create(createMonsterDto: CreateMonsterDto): Promise<Monster> {
    const createdMonster = new this.monsterModel(createMonsterDto);
    return createdMonster.save();
  }

  findAll() {
    return `This action returns all monsters`;
  }

  findOne(id: number) {
    return `This action returns a #${id} monster`;
  }

  update(id: number, updateMonsterDto: UpdateMonsterDto) {
    return `This action updates a #${id} monster`;
  }

  remove(id: number) {
    return `This action removes a #${id} monster`;
  }
}
