import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService 
      ) {}
    
      async generateToken(payload: any): Promise<string> {
        const secret = this.configService.get<string>('JWT_SECRET');
        return this.jwtService.sign(payload, { secret }); 
      }
    
      async verifyToken(token: string): Promise<any> {
        return this.jwtService.verify(token);
      }
}
