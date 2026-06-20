import type { IFizzBuzzEvaluationContext } from "../contracts/IFizzBuzzEvaluationContext.js";
import type { IFizzBuzzVisitor } from "../contracts/IFizzBuzzVisitor.js";

export abstract class AbstractBaseFizzBuzzEvaluationContext implements IFizzBuzzEvaluationContext {
  protected readonly value: number;
  protected result: string | null = null;
  protected divisor: number = 0;

  constructor(value: number) {
    this.value = value;
  }

  abstract getValue(): number;
  abstract setResult(result: string | null): void;
  abstract getResult(): string | null;
  abstract setDivisor(divisor: number): void;
  abstract getDivisor(): number;
  abstract accept(visitor: IFizzBuzzVisitor): void;
  abstract clone(): IFizzBuzzEvaluationContext;
}
