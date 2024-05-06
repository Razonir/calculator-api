import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { CalculatorService } from './calculator.service';
import { ArithmeticOperation } from '../../enums/arithmetic.enum';

describe('CalculatorService', () => {
  let service: CalculatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CalculatorService],
    }).compile();

    service = module.get<CalculatorService>(CalculatorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Addition', () => {
    it('should add two numbers correctly', () => {
      const result = service.calculate(5, 3, ArithmeticOperation.ADDITION);
      expect(result).toEqual(8);
    });
  });

  describe('Subtraction', () => {
    it('should subtract two numbers correctly', () => {
      const result = service.calculate(5, 3, ArithmeticOperation.SUBTRACTION);
      expect(result).toEqual(2);
    });
  });

  describe('Multiplication', () => {
    it('should multiply two numbers correctly', () => {
      const result = service.calculate(5, 3, ArithmeticOperation.MULTIPLICATION);
      expect(result).toEqual(15);
    });
  });

  describe('Division', () => {
    it('should divide two numbers correctly', () => {
      const result = service.calculate(15, 3, ArithmeticOperation.DIVISION);
      expect(result).toEqual(5);
    });

    it('should throw BadRequestException when dividing by zero', () => {
      expect(() => service.calculate(5, 0, ArithmeticOperation.DIVISION)).toThrow(BadRequestException);
    });
  });

  describe('Invalid Operation', () => {
    it('should throw BadRequestException for an invalid operation', () => {
      expect(() => service.calculate(5, 3, 'INVALID' as ArithmeticOperation)).toThrow(BadRequestException);
    });
  });
});
