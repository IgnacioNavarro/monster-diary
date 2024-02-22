import { Module } from '@nestjs/common';
import { MonstersService } from './monsters.service';
import { MonstersController } from './monsters.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { monsterSchema } from './schemas/monster.schema';
import { Monster } from './schemas/monster.schema';
import { MonstersVoteService } from './monsters-vote.service';
import { UsersModule } from '../users/users.module';
@Module({
  imports: [MongooseModule.forFeature([{ name: Monster.name, schema: monsterSchema }]),
  UsersModule],
  controllers: [MonstersController],
  providers: [MonstersService, MonstersVoteService],
})
export class MonstersModule {}
