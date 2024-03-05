import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { Request } from 'express'
import { TokenService } from '../../shared/services/token.service'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private tokenService: TokenService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const token = this.extractTokenFromHeader(request)
    if (!token) {
      throw new UnauthorizedException()
    }
    try {
      const payload = await this.tokenService.verify(token)
      request['user'] = payload
    } catch (error) {
      throw new UnauthorizedException(error.message)
    }
    return true
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] =
      (request.headers?.authorization || '').split(' ') ?? []
    return type === 'Bearer' ? token : undefined
  }
}
