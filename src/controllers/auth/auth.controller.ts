import { Controller, Get } from '@nestjs/common';
import { JwtAuthService } from '../../services/jwt-auth/jwt-auth.service'; 

@Controller('auth')
export class AuthController {
  constructor(private readonly jwtAuthService: JwtAuthService) {}

  @Get('token')
  async getToken() { 
    try {
      const payload = { userId: '1', role: 'Admin' };
      const token = await this.jwtAuthService.generateToken(payload);
      return { token };
    } catch (error) {
      console.error('Error generating token:', error);
      return { error: 'Failed to generate token' };
    }
  }
}
