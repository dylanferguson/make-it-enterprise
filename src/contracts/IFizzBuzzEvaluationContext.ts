import type { IFizzBuzzVisitor } from "./IFizzBuzzVisitor.js";

export interface IFizzBuzzEvaluationContext {
  getValue(): number;
  setResult(result: string | null): void;
  getResult(): string | null;
  setDivisor(divisor: number): void;
  getDivisor(): number;
  accept(visitor: IFizzBuzzVisitor): void;
  clone(): IFizzBuzzEvaluationContext;
}
