import { Test, TestingModule } from '@nestjs/testing';
import { MonstersController } from './monsters.controller';
import { MonstersService } from './monsters.service';
import { AuthModule } from '../auth/auth.module';
import { Mongoose } from 'mongoose';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { UsersModule } from '../users/users.module';
import { MonstersVoteService } from './monsters-vote.service';
import { ConfigModule } from '@nestjs/config';
import { closeInMongodConnection, rootMongooseTestModule } from '../../mongodb-test-in-memory';
import { User, userSchema } from '../users/schemas/user.schema';
import { CreateMonsterDto } from './dto/create-monster.dto';
import { monsterGender, monsterNationality, monsterTitle } from './utils';
import { Monster } from './schemas/monster.schema';

describe('MonstersController', () => {
  let controller: MonstersController;
  let service: MonstersService;

  const mockMonster: CreateMonsterDto = {
    firstName: "monstruo65751",
    lastName: "apellido666",
    title: monsterTitle.MR,
    gender: monsterGender.FEMALE,
    description: "descripcion1",
    nationality: [
        monsterNationality.AD,
        monsterNationality.AE,
    ],
    imageUrl: "https://test.com",
    goldBalance: 0,
    speed: 11.1,
    Health: 20,
    secretNotes: "nota secreta",
    monsterPassword: "monsterpasword",
    votes: []
  };


  const mockMonstersService = {
    create: jest.fn().mockResolvedValue(mockMonster),
    findAll: jest.fn().mockResolvedValue([mockMonster]),
    findOne: jest.fn().mockResolvedValue(mockMonster),
    update: jest.fn().mockResolvedValue(mockMonster),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [rootMongooseTestModule(),
        AuthModule, ConfigModule.forRoot()
     , MongooseModule.forFeature([{ name: User.name, schema: userSchema }]), UsersModule],
      controllers: [MonstersController],
      providers: [
        MonstersService,
        MonstersVoteService,
        {
        provide: getModelToken('Monster'),
        useValue: mockMonstersService,
      },
      {
        provide: MonstersVoteService,
        useValue: mockMonstersService,
      }
      ],
    }).compile();

    controller = module.get<MonstersController>(MonstersController);
    service = module.get<MonstersService>(MonstersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });


  afterEach(async () => {
    await closeInMongodConnection();
  })
});
