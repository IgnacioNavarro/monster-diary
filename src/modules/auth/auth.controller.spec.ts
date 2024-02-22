import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { User } from '../users/schemas/user.schema';
import { AuthService } from './auth.service';
import { userRole } from '../users/roles.enum';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  const mockUser: User = {
    id: '1',
    username: 'test',
    password: 'test',
    roles: [userRole.EMPLOYEE],
  };

  const access_token = 'token here';

  const mockAuthService = {
    signIn: jest.fn().mockResolvedValueOnce(access_token),
  };


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {provide: AuthService,
         useValue: mockAuthService
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);

  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should signIn', async () => {
    const user = mockUser;
    const result = await controller.signIn(user);
    expect(result).toEqual(access_token);
    
  });
});
