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
import { CreateMonsterDto } from './dto/create-monster.dto';
import { monsterGender, monsterNationality, monsterTitle } from './utils';

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
    expect(userService).toBeDefined();
  });

  it('should create a monster', async () => {
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
    const monster = await service.create(mockMonster);
    expect(monster).toBeDefined();
  }
  );

  it('should find all monsters', async () => {
    const monsters = await service.findAll({limit: 10, page: 1});
    expect(monsters).toBeDefined();
  }
  );

  it('should find a monster by id', async () => {
    const monster = await service.findOne('5eb78994dbb89024f04a2507');
    expect(monster).toBeDefined();
  }
  );

  it('should update a monster', async () => {
    const monster = await service.update('5eb78994dbb89024f04a2507', {
      firstName: "monstruo656751",
      lastName: "apellido66",
      title: monsterTitle.MS,
    });
    expect(monster).toBeDefined();
  }
  );


  it('should delete a monster', async () => {
    const monster = await service.remove('5eb78994dbb89024f04a2507');
    expect(monster).toBeDefined();
  }
  );

      

  afterEach(async () => {
    await closeInMongodConnection();
  })
});
