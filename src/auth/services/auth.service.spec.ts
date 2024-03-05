import { Test, TestingModule } from '@nestjs/testing'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { UnauthorizedException } from '@nestjs/common'
import { UserDto } from '../../user/dtos/user.dto'
import { UserService } from '../../user/services/user.service'
import { TokenService } from '../../shared/services/token.service'
import { AuthService } from './auth.service'

const mockUserService = {
  findByEmail: jest.fn(),
}

const mockTokenService = {
  generate: jest.fn(),
}

const mockUser: Partial<UserDto> = {
  id: 'xptoId',
  email: 'test@test.com',
  passwordHash: '$2b$08$iwhoyUJE.GKNWdvq6bTriO5wlvOEADYMbVNCJUpx9b3EHJ/QoTsi6',
}

describe('AuthService', () => {
  let service: AuthService
  let config: ConfigService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
        {
          provide: TokenService,
          useValue: mockTokenService,
        },
        AuthService,
      ],
    }).compile()
    service = module.get<AuthService>(AuthService)
    config = module.get<ConfigService>(ConfigService)
    mockTokenService.generate.mockResolvedValueOnce({
      accessToken: 'a2',
      refreshToken: 'r3',
    })
  })

  it('should throw an error when not pass a email to sign in ', async () => {
    expect(() => service.signIn(undefined, 'test3123')).rejects.toThrowError(
      new UnauthorizedException('Email is required!'),
    )
  })

  it('should throw an error when not pass a password to sign in ', async () => {
    expect(() =>
      service.signIn('test@test.com', undefined),
    ).rejects.toThrowError(new UnauthorizedException('Password is required!'))
  })

  it('should throw an error when trying the wrong password to sign in ', async () => {
    mockUserService.findByEmail.mockResolvedValueOnce(mockUser)
    jest.spyOn(config, 'get').mockReturnValue('60s')
    expect(() =>
      service.signIn('test@test.com', 'test3123'),
    ).rejects.toThrowError(new UnauthorizedException('Invalid password!'))
  })

  it('should generate the tokens when sign in', async () => {
    mockUserService.findByEmail.mockResolvedValueOnce(mockUser)
    jest.spyOn(config, 'get').mockReturnValue('60s')
    const tokens = await service.signIn('test@test.com', 'test123')
    expect(tokens.accessToken).toBeDefined()
    expect(tokens.refreshToken).toBeDefined()
  })

  it('should generate tokens for refresh', async () => {
    mockUserService.findByEmail.mockResolvedValueOnce(mockUser)
    jest.spyOn(config, 'get').mockReturnValue('60s')
    const tokens = await service.refreshToken('test@test.com')
    expect(tokens.accessToken).toBeDefined()
    expect(tokens.refreshToken).toBeDefined()
  })
})
