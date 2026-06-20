import type { IAspectAdvice, AdviceType } from "../contracts/IAspectAdvice.js";
import type { IAspectJoinPoint } from "../contracts/IAspectJoinPoint.js";

export abstract class AbstractBaseAspectAdvice implements IAspectAdvice {
  protected static readonly ADVICE_CONTEXT_PREFIX = "aop:advice";

  private readonly adviceName: string;
  private readonly adviceVersion: string;
  private readonly adviceType: AdviceType;
  private readonly adviceOrder: number;

  constructor(adviceName: string, adviceVersion: string, adviceType: AdviceType, adviceOrder: number) {
    this.adviceName = adviceName;
    this.adviceVersion = adviceVersion;
    this.adviceType = adviceType;
    this.adviceOrder = adviceOrder;
  }

  getAdviceName(): string {
    return this.adviceName;
  }

  getAdviceVersion(): string {
    return this.adviceVersion;
  }

  getAdviceType(): AdviceType {
    return this.adviceType;
  }

  getAdviceOrder(): number {
    return this.adviceOrder;
  }

  abstract invoke(joinPoint: IAspectJoinPoint): unknown;

  protected buildAdviceContext(joinPoint: IAspectJoinPoint): string {
    return `${AbstractBaseAspectAdvice.ADVICE_CONTEXT_PREFIX}:${this.adviceName}:${joinPoint.getMethodName()}:${Date.now()}:${Math.random().toString(36).substring(2, 10)}`;
  }
}
