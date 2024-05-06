import {
    Controller,
    Post,
    Headers,
    Body,
    BadRequestException,
    UseGuards,
  } from '@nestjs/common';
  import { ArithmeticOperation } from '../../enums/arithmetic.enum';
import { JwtAuthService } from '../../services/jwt-auth/jwt-auth.service';
import { JwtGuard } from '../../guards/jwt/jwt.guard';
import { CalculatorService } from '../../services/calculator/calculator.service';
  
  @Controller('calculator')
  export class CalculatorController {
    constructor(
      private readonly calculatorService: CalculatorService,
      private readonly jwtAuthService: JwtAuthService,
    ) {}
  
    @Post()
    @UseGuards(JwtGuard)
    async calculate(
      @Body() body: { num1: number; num2: number },
      @Headers('arithmetic-value') arithmeticValue: string, 
    ) {

  
      const { num1, num2 } = body;
  
      // Check if the numbers are valid
      if (!num1 || !num2 || isNaN(num1) || isNaN(num2)) {
        throw new BadRequestException(
          'Both num1 and num2 must be valid numbers.',
        );
      }
  
      // Check if the arithmetic value is valid
      const validArithmeticValues = Object.values(ArithmeticOperation);
      if (
        !arithmeticValue ||
        !validArithmeticValues.includes(arithmeticValue as ArithmeticOperation)
      ) {
        throw new BadRequestException(
          'Arithmetic value is missing or invalid in headers: ' + arithmeticValue,
        );
      }
  
      const result = this.calculatorService.calculate(
        num1,
        num2,
        arithmeticValue as ArithmeticOperation, // Cast to ArithmeticOperation
      );
      return { result };
    }
  }
  