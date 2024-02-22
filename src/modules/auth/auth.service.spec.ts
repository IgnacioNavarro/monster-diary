import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { create } from 'domain';
import { getModelToken } from '@nestjs/mongoose';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;
  

  let token = 'token here';

  const mockUser = {
    sub: '1',
    username: 'test',
    roles: ['admin'],
  };

  const mockJwtService = {
    create: jest.fn(),
  };


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService,
       JwtService,
       {provide: getModelToken(mockUser.username),
        useValue: mockJwtService
       },],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
