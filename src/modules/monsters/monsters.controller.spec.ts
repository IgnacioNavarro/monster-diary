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

describe('MonstersController', () => {
  let controller: MonstersController;
  let service: MonstersService;

  const mockMonster = {
    id: "65d7a63705d02c081865288d",
    firstName: "monstruo65751",
    lastName: "apellido666",
    title: "Ms",
    gender: "Male",
    description: "descripcion1",
    nationality: [
        "ES",
        "CZ"
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
    remove: jest.fn().mockResolvedValue(mockMonster),
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
  });

  afterEach(async () => {
    await closeInMongodConnection();
  })
});
