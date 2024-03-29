import { Test, TestingModule } from '@nestjs/testing'
import { TokenService } from './token.service'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'

describe('TokenService', () => {
  let service: TokenService
  let config: ConfigService

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
            }
          },
        }),
      ],
      providers: [TokenService],
    }).compile()
    service = module.get<TokenService>(TokenService)
    config = module.get<ConfigService>(ConfigService)
  })

  it('should generate tokens for refresh', async () => {
    jest.spyOn(config, 'get').mockReturnValue('60s')
    const tokens = await service.generate({ sub: 1 })
    expect(tokens.accessToken).toBeDefined()
    expect(tokens.refreshToken).toBeDefined()
  })
})
