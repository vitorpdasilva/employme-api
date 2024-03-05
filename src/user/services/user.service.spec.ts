import { Test, TestingModule } from '@nestjs/testing'
import { TokenService } from '../../shared/services/token.service'
import { UserRepository } from '../repositories/user.repository'
import { UserService } from './user.service'

const mockTokenService = {}
const mockUserRepository = {}

describe('UserService', () => {
  let service: UserService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: TokenService,
          useValue: mockTokenService,
        },
        {
          provide: UserRepository,
          useValue: mockUserRepository,
        },
      ],
    }).compile()

    service = module.get<UserService>(UserService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
