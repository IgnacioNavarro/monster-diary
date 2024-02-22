import { CreateMonsterDto } from './dto/create-monster.dto';
import { UpdateMonsterDto } from './dto/update-monster.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { Monster } from './schemas/monster.schema';
import { Model, PaginateModel } from 'mongoose';
import { UpdateGoldDto } from './dto/update-gold.dto';
import { User } from '../users/schemas/user.schema';
import { UsersService } from '../users/users.service';
import { MonstersService } from './monsters.service';
import { find } from 'rxjs';

@Injectable()
export class MonstersVoteService {
  constructor(
    @InjectModel(Monster.name)
    private monsterModel: PaginateModel<Monster>,
    private usersService: UsersService,
  ) {}

  
  async voteForMonster(monsterId: string, username: string) {
    const user = await this.usersService.findOneByUsername(username);

    const result = user.username;
    console.log('user', user.username);

    
    const monster = await this.monsterModel.findById(monsterId);
    console.log('monster', monster);

    if(monster.votes.includes(user.username)){
      throw new Error('You have already voted for this monster');
    }
    monster.votes.push(user.username);
    await monster.save();
    return "Voted for monster";
  }

  async clearVotes(monsterId: string) {
    const monster = await this.monsterModel.findById(monsterId);
    monster.votes = [];
    await monster.save();
    return "Votes cleared";
  }

}
