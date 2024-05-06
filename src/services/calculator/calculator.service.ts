import { Injectable, BadRequestException } from '@nestjs/common';
import { ArithmeticOperation } from '../../enums/arithmetic.enum';

type OperationResult = number | string;

@Injectable()
export class CalculatorService {
  calculate(num1: number, num2: number, operation: ArithmeticOperation): OperationResult {
    switch (operation) {
      case ArithmeticOperation.ADDITION:
        return num1 + num2;
      case ArithmeticOperation.SUBTRACTION:
        return num1 - num2;
      case ArithmeticOperation.MULTIPLICATION:
        return num1 * num2;
      case ArithmeticOperation.DIVISION:
        if (num2 === 0) {
          throw new BadRequestException('Division by zero is not allowed');
        }
        return num1 / num2;
      default:
        throw new BadRequestException('Invalid operation');
    }
  }
}
