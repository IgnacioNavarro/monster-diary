import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { closeInMongodConnection, rootMongooseTestModule } from '../../mongodb-test-in-memory';
import { AuthModule } from '../auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from './schemas/user.schema';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
      imports: [rootMongooseTestModule(),
        AuthModule, ConfigModule.forRoot(),
        MongooseModule.forFeature([{ name: User.name, schema: userSchema }]),
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  afterEach(async () => {
    await closeInMongodConnection();
  })
});
