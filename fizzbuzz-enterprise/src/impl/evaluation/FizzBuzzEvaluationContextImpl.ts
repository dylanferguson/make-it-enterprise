import { AbstractBaseFizzBuzzEvaluationContext } from "../../abstracts/AbstractBaseFizzBuzzEvaluationContext.js";
import type { IFizzBuzzVisitor } from "../../contracts/IFizzBuzzVisitor.js";

export class FizzBuzzEvaluationContextImpl extends AbstractBaseFizzBuzzEvaluationContext {
  constructor(value: number) {
    super(value);
  }

  override getValue(): number {
    return this.value;
  }

  override setResult(result: string | null): void {
    this.result = result;
  }

  override getResult(): string | null {
    return this.result;
  }

  override setDivisor(divisor: number): void {
    this.divisor = divisor;
  }

  override getDivisor(): number {
    return this.divisor;
  }

  override accept(visitor: IFizzBuzzVisitor): void {
    visitor.visitEvaluationContext(this);
  }

  override clone(): FizzBuzzEvaluationContextImpl {
    const clone = new FizzBuzzEvaluationContextImpl(this.value);
    clone.setResult(this.result);
    clone.setDivisor(this.divisor);
    return clone;
  }
}
