import { Test, TestingModule } from '@nestjs/testing';
import { JwtAuthService } from './jwt-auth.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

describe('JwtAuthService', () => {
  let service: JwtAuthService;
  let jwtService: JwtService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtAuthService,
        JwtService,
        ConfigService,
      ],
    }).compile();

    service = module.get<JwtAuthService>(JwtAuthService);
    jwtService = module.get<JwtService>(JwtService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('generateToken', () => {
    it('should return a token', async () => {
      jest.spyOn(configService, 'get').mockReturnValue('secret');

      const signSpy = jest.spyOn(jwtService, 'sign').mockReturnValue('generatedToken');

      const payload = { id: 1, username: 'testuser' };
      const token = await service.generateToken(payload);

      expect(token).toEqual('generatedToken');
      expect(signSpy).toHaveBeenCalledWith(payload, { secret: 'secret' });
    });
  });

  describe('verifyToken', () => {
    it('should return the decoded token payload', async () => {
      const verifySpy = jest.spyOn(jwtService, 'verify').mockReturnValue({ id: 1, username: 'testuser' });

      const decodedPayload = await service.verifyToken('testToken');

      expect(decodedPayload).toEqual({ id: 1, username: 'testuser' });
      expect(verifySpy).toHaveBeenCalledWith('testToken');
    });
  });
});
