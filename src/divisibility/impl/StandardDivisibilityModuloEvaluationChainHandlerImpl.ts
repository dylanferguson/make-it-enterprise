import { AbstractBaseDivisibilityModuloEvaluationChainHandler } from "../abstracts/AbstractBaseDivisibilityModuloEvaluationChainHandler.js";
import { RemainderComputationStrategyProviderFactoryBeanFactory } from "../../operators/impl/factories/RemainderComputationStrategyProviderFactoryBeanFactory.js";
import type { IRemainderComputationStrategyProvider } from "../../operators/contracts/IRemainderComputationStrategyProvider.js";

export class StandardDivisibilityModuloEvaluationChainHandlerImpl
  extends AbstractBaseDivisibilityModuloEvaluationChainHandler
{
  private static readonly HANDLER_NAME = "StandardDivisibilityModuloEvaluationChainHandler";
  private static readonly HANDLER_VERSION = "1.1.0-ENTERPRISE-STRATEGY-PROVIDER-ENABLED";
  private static readonly HANDLER_PRIORITY = 100;
  private static readonly COMPUTATION_STRATEGY_DESCRIPTION = "EnterpriseRemainderStrategyProviderDrivenModuloEvaluationStrategy";
  private static readonly VALIDATION_ENABLED = true;

  private evaluationCount: number = 0;
  private static remainderProvider: IRemainderComputationStrategyProvider | null = null;

  constructor() {
    super(
      StandardDivisibilityModuloEvaluationChainHandlerImpl.HANDLER_NAME,
      StandardDivisibilityModuloEvaluationChainHandlerImpl.HANDLER_VERSION,
      StandardDivisibilityModuloEvaluationChainHandlerImpl.HANDLER_PRIORITY,
    );
  }

  private ensureRemainderProvider(): IRemainderComputationStrategyProvider {
    if (StandardDivisibilityModuloEvaluationChainHandlerImpl.remainderProvider === null) {
      StandardDivisibilityModuloEvaluationChainHandlerImpl.remainderProvider =
        RemainderComputationStrategyProviderFactoryBeanFactory.createProvider();
    }
    return StandardDivisibilityModuloEvaluationChainHandlerImpl.remainderProvider;
  }

  override handleModuloEvaluation(dividend: number, divisor: number, evaluationContext: string | null): number {
    this.evaluationCount++;
    this.validateOperands(dividend, divisor);
    const truncatedDividend = Math.trunc(dividend);
    const truncatedDivisor = Math.trunc(divisor);
    const provider = this.ensureRemainderProvider();
    const remainder = provider.resolveRemainder(truncatedDividend, truncatedDivisor);
    console.debug(
      `[${StandardDivisibilityModuloEvaluationChainHandlerImpl.HANDLER_NAME}] ` +
      `Evaluating modulo via ${StandardDivisibilityModuloEvaluationChainHandlerImpl.COMPUTATION_STRATEGY_DESCRIPTION}: ` +
      `${truncatedDividend} % ${truncatedDivisor} = ${remainder} ` +
      `(context=${evaluationContext ?? "NONE"}) ` +
      `provider=[${provider.getProviderName()} v${provider.getProviderVersion()}], ` +
      `selector=[${provider.getStrategySelector().getSelectorName()} v${provider.getStrategySelector().getSelectorVersion()}], ` +
      `strategy=[${provider.getStrategySelector().selectStrategy(divisor).getStrategyName()}]`,
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
