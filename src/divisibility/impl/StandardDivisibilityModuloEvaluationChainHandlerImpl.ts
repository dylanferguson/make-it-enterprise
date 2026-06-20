import { AbstractBaseDivisibilityModuloEvaluationChainHandler } from "../abstracts/AbstractBaseDivisibilityModuloEvaluationChainHandler.js";

export class StandardDivisibilityModuloEvaluationChainHandlerImpl
  extends AbstractBaseDivisibilityModuloEvaluationChainHandler
{
  private static readonly HANDLER_NAME = "StandardDivisibilityModuloEvaluationChainHandler";
  private static readonly HANDLER_VERSION = "1.0.0-STANDARD-MODULO-CHAIN";
  private static readonly HANDLER_PRIORITY = 100;
  private static readonly COMPUTATION_STRATEGY_DESCRIPTION = "StandardRemainderBasedDirectModuloEvaluationStrategy";
  private static readonly VALIDATION_ENABLED = true;

  private evaluationCount: number = 0;

  constructor() {
    super(
      StandardDivisibilityModuloEvaluationChainHandlerImpl.HANDLER_NAME,
      StandardDivisibilityModuloEvaluationChainHandlerImpl.HANDLER_VERSION,
      StandardDivisibilityModuloEvaluationChainHandlerImpl.HANDLER_PRIORITY,
    );
  }

  override handleModuloEvaluation(dividend: number, divisor: number, evaluationContext: string | null): number {
    this.evaluationCount++;
    this.validateOperands(dividend, divisor);
    const truncatedDividend = Math.trunc(dividend);
    const truncatedDivisor = Math.trunc(divisor);
    const remainder = truncatedDividend % truncatedDivisor;
    console.debug(
      `[${StandardDivisibilityModuloEvaluationChainHandlerImpl.HANDLER_NAME}] ` +
      `Evaluating modulo via ${StandardDivisibilityModuloEvaluationChainHandlerImpl.COMPUTATION_STRATEGY_DESCRIPTION}: ` +
      `${truncatedDividend} % ${truncatedDivisor} = ${remainder} ` +
      `(context=${evaluationContext ?? "NONE"})`,
    );
    return remainder;
  }

  getEvaluationCount(): number {
    return this.evaluationCount;
  }

  private validateOperands(dividend: number, divisor: number): void {
    if (!Number.isFinite(dividend)) {
      throw new Error(
        `[${StandardDivisibilityModuloEvaluationChainHandlerImpl.HANDLER_NAME}] Invalid dividend: ${dividend}`,
      );
    }
    if (!Number.isFinite(divisor) || divisor <= 0) {
      throw new Error(
        `[${StandardDivisibilityModuloEvaluationChainHandlerImpl.HANDLER_NAME}] Invalid divisor: ${divisor} ` +
        `(must be a positive finite number)`,
      );
    }
  }
}
