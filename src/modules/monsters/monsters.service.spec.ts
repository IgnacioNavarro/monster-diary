import { Test, TestingModule } from '@nestjs/testing';
import { MonstersService } from './monsters.service';
import { closeInMongodConnection, rootMongooseTestModule } from '../../mongodb-test-in-memory';
import { AuthModule } from '../auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { Monster, monsterSchema } from './schemas/monster.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from '../auth/auth.service';
import { MonstersVoteService } from './monsters-vote.service';
import { User, userSchema } from '../users/schemas/user.schema';

describe('MonstersService', () => {
  let service: MonstersService;
  let userService: UsersService;
  let voteService: MonstersVoteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, MonstersService, UsersService],
      imports: [rootMongooseTestModule(),
        MongooseModule.forFeature([{ name: Monster.name, schema: monsterSchema }]),
        MongooseModule.forFeature([{ name: User.name, schema: userSchema }]),
        AuthModule, ConfigModule.forRoot()],
    }).compile();

    service = module.get<MonstersService>(MonstersService);
    userService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  afterEach(async () => {
    await closeInMongodConnection();
  })
});
