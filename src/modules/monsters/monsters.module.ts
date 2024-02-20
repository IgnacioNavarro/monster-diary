import { Module } from '@nestjs/common';
import { MonstersService } from './monsters.service';
import { MonstersController } from './monsters.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { monsterSchema } from './schemas/monster.schema';
import { Monster } from './schemas/monster.schema';
@Module({
  imports: [MongooseModule.forFeature([{ name: Monster.name, schema: monsterSchema }])],
  controllers: [MonstersController],
  providers: [MonstersService],
})
export class MonstersModule {}
