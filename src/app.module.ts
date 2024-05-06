import { Module } from '@nestjs/common';
import { CalculatorController } from 'src/controllers/calculator/calculator.controller';
import { CalculatorService } from 'src/services/calculator/calculator.service';
import { JwtConfigModule } from 'src/modules/jwt/jwt.module';
import { JwtAuthService } from 'src/services/jwt-auth/jwt-auth.service';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from 'src/controllers/auth/auth.controller';

@Module({
  imports: [ConfigModule.forRoot(), JwtConfigModule],
  controllers: [CalculatorController, AuthController],
  providers: [CalculatorService, JwtAuthService],
})
export class AppModule {}
