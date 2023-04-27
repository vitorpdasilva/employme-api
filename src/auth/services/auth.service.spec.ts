import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserService } from '../../user/services/user.service';
import { UserDto } from '../../user/dtos/user.dto';
import { UnauthorizedException } from '@nestjs/common';

const mockUserService = {
  findOneByEmail: jest.fn(),
};

const mockUser: UserDto = {
  id: 'xptoId',
  email: 'test@test.com',
  passwordHash: '$2b$08$iwhoyUJE.GKNWdvq6bTriO5wlvOEADYMbVNCJUpx9b3EHJ/QoTsi6',
};

describe('AuthService', () => {
  let service: AuthService;
  let config: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule,
        JwtModule.registerAsync({
          useFactory: () => {
            return {
              secret: 'JWT_SECRET_KEY',
              signOptions: {
                expiresIn: '60s',
              },
            };
          },
        }),
      ],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
        AuthService,
      ],
    }).compile();
    service = module.get<AuthService>(AuthService);
    config = module.get<ConfigService>(ConfigService);
  });

  it('should throw an error when not pass a email to sign in ', async () => {
    expect(() => service.signIn(undefined, 'test3123')).rejects.toThrowError(
      new UnauthorizedException('Email is required!'),
    );
  });

  it('should throw an error when not pass a password to sign in ', async () => {
    expect(() =>
      service.signIn('test@test.com', undefined),
    ).rejects.toThrowError(new UnauthorizedException('Password is required!'));
  });

  it('should throw an error when trying the wrong password to sign in ', async () => {
    mockUserService.findOneByEmail.mockResolvedValueOnce(mockUser);
    jest.spyOn(config, 'get').mockReturnValue('60s');
    expect(() =>
      service.signIn('test@test.com', 'test3123'),
    ).rejects.toThrowError(new UnauthorizedException('Invalid password!'));
  });

  it('should generate the tokens when sign in', async () => {
    mockUserService.findOneByEmail.mockResolvedValueOnce(mockUser);
    jest.spyOn(config, 'get').mockReturnValue('60s');
    const tokens = await service.signIn('test@test.com', 'test123');
    expect(tokens.accessToken).toBeDefined();
    expect(tokens.refreshToken).toBeDefined();
  });

  it('should generate tokens for refresh', async () => {
    mockUserService.findOneByEmail.mockResolvedValueOnce(mockUser);
    jest.spyOn(config, 'get').mockReturnValue('60s');
    const tokens = await service.refreshToken('test@test.com');
    expect(tokens.accessToken).toBeDefined();
    expect(tokens.refreshToken).toBeDefined();
  });
});
