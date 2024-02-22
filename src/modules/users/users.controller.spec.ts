import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthController } from '../auth/auth.controller';
import { AuthModule } from '../auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from './schemas/user.schema';
import { UsersModule } from './users.module';
import { ConfigModule } from '@nestjs/config';
import { closeInMongodConnection, rootMongooseTestModule } from '../../mongodb-test-in-memory';


describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;



  const mockUser = {
    id: '1',
    username: 'test',
    password: 'test',
    roles: ['admin'],
  };

  const mockMongooseModule= {
    // Mock the methods used by your UserModel here.
  };

  const mockUsersService = {
    create: jest.fn().mockResolvedValue(mockUser),
    findAll: jest.fn().mockResolvedValue([mockUser]),
    findOne: jest.fn().mockResolvedValue(mockUser),
    remove: jest.fn().mockResolvedValue(mockUser),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [rootMongooseTestModule(),
         AuthModule, ConfigModule.forRoot()
      , MongooseModule.forFeature([{ name: User.name, schema: userSchema }])
      ],
      controllers: [UsersController],
      providers: [
        UsersService
        
        // UsersModule,
        // {
        //   provide: UsersService,
        //   useValue: mockUsersService
        // },
        // {
        //   provide: MongooseModule,
        //   useValue: mockMongooseModule
        // }
        ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  afterEach(async () => {
    await closeInMongodConnection();
  })
});
