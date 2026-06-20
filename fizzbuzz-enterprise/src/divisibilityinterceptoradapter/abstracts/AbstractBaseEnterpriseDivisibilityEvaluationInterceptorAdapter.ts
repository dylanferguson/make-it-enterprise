import type { IEnterpriseDivisibilityEvaluationInterceptorAdapter } from "../contracts/IEnterpriseDivisibilityEvaluationInterceptorAdapter.js";
import type { IEnterpriseDivisibilityEvaluationInterceptorAdapterStrategy } from "../contracts/IEnterpriseDivisibilityEvaluationInterceptorAdapterStrategy.js";

export abstract class AbstractBaseEnterpriseDivisibilityEvaluationInterceptorAdapter
  implements IEnterpriseDivisibilityEvaluationInterceptorAdapter
{
  protected static readonly ADAPTER_CONTEXT_PREFIX = "div:eval:ia";
  protected abstract readonly adapterName: string;
  protected abstract readonly adapterVersion: string;

  protected readonly strategyRegistry: Map<number, IEnterpriseDivisibilityEvaluationInterceptorAdapterStrategy> = new Map();
  protected invocationCount: number = 0;

  abstract interceptEvaluation(value: number, divisor: number, context: string | null): number;

  registerInterceptorAdapterStrategy(
    divisor: number,
    strategy: IEnterpriseDivisibilityEvaluationInterceptorAdapterStrategy,
  ): void {
    this.strategyRegistry.set(divisor, strategy);
  }

  resolveAdapterStrategy(divisor: number): IEnterpriseDivisibilityEvaluationInterceptorAdapterStrategy | null {
    return this.strategyRegistry.get(divisor) ?? null;
  }

  getAdapterName(): string {
    return this.adapterName;
  }

  getAdapterVersion(): string {
    return this.adapterVersion;
  }

  getRegisteredDivisors(): readonly number[] {
    return Array.from(this.strategyRegistry.keys());
  }

  getAdapterInvocationCount(): number {
    return this.invocationCount;
  }

  protected buildAdapterContext(value: number, divisor: number): string {
    return `${AbstractBaseEnterpriseDivisibilityEvaluationInterceptorAdapter.ADAPTER_CONTEXT_PREFIX}:${value}:${divisor}:${Date.now()}`;
  }

  protected validateDivisor(divisor: number): void {
    if (!Number.isFinite(divisor) || divisor === 0) {
      throw new Error(
        `[${this.getAdapterName()} v${this.getAdapterVersion()}] ` +
        `Invalid divisor: [${divisor}]. Divisor must be a finite non-zero number.`,
      );
    }
  }
}
