import { Test, TestingModule } from '@nestjs/testing';
import { CalculatorController } from './calculator.controller';
import { JwtGuard } from '../../guards/jwt/jwt.guard';
import { JwtAuthService } from '../../services/jwt-auth/jwt-auth.service';
import { CalculatorService } from '../../services/calculator/calculator.service';
import { JwtService } from '@nestjs/jwt'; 
import { ConfigService } from '@nestjs/config';
import { BadRequestException } from '@nestjs/common';
import { ArithmeticOperation } from '../../enums/arithmetic.enum';

describe('CalculatorController', () => {
  let controller: CalculatorController;
  let calculatorServiceMock: Partial<CalculatorService>;
  let jwtAuthServiceMock: Partial<JwtAuthService>;

  beforeEach(async () => {
    calculatorServiceMock = {
      calculate: jest.fn(),
    };
    jwtAuthServiceMock = {
      verifyToken: jest.fn().mockResolvedValue({}),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CalculatorController],
      providers: [
        { provide: CalculatorService, useValue: calculatorServiceMock },
        { provide: JwtAuthService, useValue: jwtAuthServiceMock },
        JwtService,
        ConfigService,
      ], 
    }).compile();

    controller = module.get<CalculatorController>(CalculatorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('calculate', () => {
    it('should calculate correctly', async () => {
      const num1 = 5;
      const num2 = 3;
      const arithmeticValue = ArithmeticOperation.ADDITION;

      (calculatorServiceMock.calculate as jest.Mock).mockReturnValue(8);

      const result = await controller.calculate(
        { num1, num2 },
        arithmeticValue,
        'Bearer token',
      );

      expect(result).toEqual({ result: 8 });
      expect(calculatorServiceMock.calculate).toHaveBeenCalledWith(num1, num2, arithmeticValue);
    });

    it('should throw BadRequestException for invalid arithmetic value', async () => {
      const num1 = 5;
      const num2 = 3;
      const arithmeticValue = 'invalid';

      await expect(async () => {
        await controller.calculate(
          { num1, num2 },
          arithmeticValue,
          'Bearer token',
        );
      }).rejects.toThrowError(BadRequestException);
    });

  });
});
