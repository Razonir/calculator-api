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
import { ApiBody } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';

class CalculationRequestBody {
  @ApiProperty()
  num1: number;

  @ApiProperty()
  num2: number;
}

@Controller('calculator')
export class CalculatorController {
  constructor(
    private readonly calculatorService: CalculatorService,
    private readonly jwtAuthService: JwtAuthService,
  ) {}

  @Post()
  @UseGuards(JwtGuard)
  @ApiBody({ type: CalculationRequestBody })
  async calculate(
    @Body() body: CalculationRequestBody,
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
