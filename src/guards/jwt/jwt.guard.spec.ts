import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtGuard } from './jwt.guard';

describe('JwtGuard', () => {
  it('should be defined', () => {
    const jwtServiceMock = {} as JwtService; 
    const configServiceMock = {} as ConfigService; 
    expect(new JwtGuard(jwtServiceMock, configServiceMock)).toBeDefined();
  });
});
