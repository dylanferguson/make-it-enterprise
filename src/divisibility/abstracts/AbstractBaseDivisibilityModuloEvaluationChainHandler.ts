import type { IDivisibilityModuloEvaluationChainHandler } from "../contracts/IDivisibilityModuloEvaluationChainHandler.js";

export abstract class AbstractBaseDivisibilityModuloEvaluationChainHandler
  implements IDivisibilityModuloEvaluationChainHandler
{
  private readonly handlerName: string;
  private readonly handlerVersion: string;
  private readonly handlerPriority: number;
  protected nextHandler: IDivisibilityModuloEvaluationChainHandler | null = null;

  constructor(handlerName: string, handlerVersion: string, handlerPriority: number) {
    this.handlerName = handlerName;
    this.handlerVersion = handlerVersion;
    this.handlerPriority = handlerPriority;
  }

  getHandlerName(): string {
    return this.handlerName;
  }

  getHandlerVersion(): string {
    return this.handlerVersion;
  }

  getHandlerPriority(): number {
    return this.handlerPriority;
  }

  setNext(handler: IDivisibilityModuloEvaluationChainHandler): IDivisibilityModuloEvaluationChainHandler {
    this.nextHandler = handler;
    return handler;
  }

  abstract handleModuloEvaluation(dividend: number, divisor: number, evaluationContext: string | null): number;

  protected delegateToNext(dividend: number, divisor: number, evaluationContext: string | null): number {
    if (this.nextHandler !== null) {
      return this.nextHandler.handleModuloEvaluation(dividend, divisor, evaluationContext);
    }
    throw new Error(
      `[${this.handlerName}] No next handler configured in chain for modulo evaluation ` +
      `(dividend=${dividend}, divisor=${divisor})`,
    );
  }
}
