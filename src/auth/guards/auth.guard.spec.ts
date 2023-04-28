import { Test } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces/features/arguments-host.interface';
import { AuthGuard } from './auth.guard';
import { ConfigService } from '@nestjs/config';

const mockJwtService = {
  verifyAsync: jest.fn(),
};

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthGuard,
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        ConfigService,
      ],
    }).compile();
    guard = module.get<AuthGuard>(AuthGuard);
  });

  describe('canActivate', () => {
    it('should throw an error when not pass a header', async () => {
      const mockRequest: any = { headers: null };
      const mockHttpArgumentsHost: Partial<HttpArgumentsHost> = {
        getRequest: () => mockRequest as any,
      };
      const mockExecutionContext: Partial<ExecutionContext> = {
        switchToHttp: () => mockHttpArgumentsHost as HttpArgumentsHost,
      };

      expect(() =>
        guard.canActivate(mockExecutionContext as ExecutionContext),
      ).rejects.toThrowError(new UnauthorizedException());
    });

    it('should authorized when pass right header', async () => {
      const mockRequest = { headers: { authorization: 'Bearer xxx.xxx.xxx' } };
      const mockHttpArgumentsHost: Partial<HttpArgumentsHost> = {
        getRequest: () => mockRequest as any,
      };
      const mockExecutionContext: Partial<ExecutionContext> = {
        switchToHttp: () => mockHttpArgumentsHost as HttpArgumentsHost,
      };
      mockJwtService.verifyAsync.mockResolvedValueOnce({
        email: 'test@test.com',
      });
      const result = await guard.canActivate(
        mockExecutionContext as ExecutionContext,
      );
      expect(result).toBeTruthy();
    });
  });
});
