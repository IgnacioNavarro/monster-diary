import { CreateMonsterDto } from './dto/create-monster.dto';
import { UpdateMonsterDto } from './dto/update-monster.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { Monster } from './schemas/monster.schema';
import { Model, PaginateModel } from 'mongoose';

@Injectable()
export class MonstersService {
  constructor(
    @InjectModel(Monster.name)
    private monsterModel: PaginateModel<Monster>,
  ) {}

  async create(createMonsterDto: CreateMonsterDto): Promise<Monster> {
    const createdMonster = new this.monsterModel(createMonsterDto);
    return createdMonster.save();
  }

  async findAll(query): Promise<Monster[]> {

    return this.monsterModel.paginate({},{
      page: query.page,
      limit: query.limit
    
    }).then((result) => {
      return result.docs;
    }
    );
    //return this.monsterModel.find().exec();
  }

  async findOne(id: string):Promise<Monster> {
    return this.monsterModel.findById({_id: id}).exec();
    
  }

  async update(id: string, updateMonsterDto: UpdateMonsterDto): Promise<Monster> {
    return this.monsterModel.findByIdAndUpdate({_id: id}, updateMonsterDto, {new: true}).exec();
  }

  async remove(id: string): Promise<Monster> {
    const result = await this.monsterModel.findByIdAndDelete({_id: id}).exec();
    return result;
  }
}
