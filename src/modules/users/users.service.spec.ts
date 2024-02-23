import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { closeInMongodConnection, rootMongooseTestModule } from '../../mongodb-test-in-memory';
import { AuthModule } from '../auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from './schemas/user.schema';
import { userRole } from './roles.enum';

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

  it('should find a user by username', async () => {
    const user = await service.findOneByUsername('test');
    expect(user).toBeDefined();
  }
  );

  it('should find all users', async () => {
    const users = await service.findAll({limit: 10, page: 1});
    expect(users).toBeDefined();
  }
  );

  it('should add a user', async () => {
    const user = await service.create({
      username: 'testing',
      password: 'password',
    });
    expect(user).toBeDefined();
  }
  );

  it('should update a user', async () => {
    const user = await service.update('5eb78994dbb89024f04a2507', {
      username: 'testing2',
      password: 'password2',
    });
    expect(user).toBeDefined();
  }
  );

  it('should delete a user', async () => {
    const user = await service.remove('5eb78994dbb89024f04a2507');
    expect(user).toBeDefined();
  }
  );

  it('should find a user by id', async () => {
    const user = await service.findById('5eb78994dbb89024f04a2507');
    expect(user).toBeDefined();
  }
  );

  afterEach(async () => {
    await closeInMongodConnection();
  })
});
