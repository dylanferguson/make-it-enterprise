import { AbstractBaseFizzBuzzEvaluationContext } from "../../abstracts/AbstractBaseFizzBuzzEvaluationContext.js";
import type { IFizzBuzzEnterpriseEvaluationContext } from "../../contracts/IFizzBuzzEnterpriseEvaluationContext.js";
import type { IFizzBuzzVisitor } from "../../contracts/IFizzBuzzVisitor.js";

export class FizzBuzzEnterpriseEvaluationContextImpl
  extends AbstractBaseFizzBuzzEvaluationContext
  implements IFizzBuzzEnterpriseEvaluationContext
{
  private static readonly DEFAULT_ORIGIN = "FizzBuzzEnterpriseEvaluationContext";
  private static readonly DEFAULT_CONTEXT_VERSION = "2.0.0-ENTERPRISE-CONTEXT";
  private readonly annotations: Map<string, string> = new Map();
  private readonly origin: string;
  private readonly contextVersion: string;

  constructor(
    value: number,
    origin: string = FizzBuzzEnterpriseEvaluationContextImpl.DEFAULT_ORIGIN,
    contextVersion: string = FizzBuzzEnterpriseEvaluationContextImpl.DEFAULT_CONTEXT_VERSION,
  ) {
    super(value);
    this.origin = origin;
    this.contextVersion = contextVersion;
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

  override clone(): FizzBuzzEnterpriseEvaluationContextImpl {
    const clone = new FizzBuzzEnterpriseEvaluationContextImpl(
      this.value,
      this.origin,
      this.contextVersion,
    );
    clone.setResult(this.result);
    clone.setDivisor(this.divisor);
    for (const [key, value] of this.annotations) {
      clone.setAnnotation(key, value);
    }
    return clone;
  }

  setAnnotation(key: string, value: string): void {
    this.annotations.set(key, value);
  }

  getAnnotation(key: string): string | null {
    return this.annotations.get(key) ?? null;
  }

  getAllAnnotations(): Readonly<Record<string, string>> {
    const result: Record<string, string> = {};
    for (const [key, value] of this.annotations) {
      result[key] = value;
    }
    return result;
  }

  getOrigin(): string {
    return this.origin;
  }

  getContextVersion(): string {
    return this.contextVersion;
  }

  clearAnnotations(): void {
    this.annotations.clear();
  }
}
