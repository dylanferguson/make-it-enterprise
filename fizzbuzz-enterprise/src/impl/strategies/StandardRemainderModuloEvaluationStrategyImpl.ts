import { AbstractBaseModuloEvaluationStrategy } from "../../abstracts/AbstractBaseModuloEvaluationStrategy.js";
import type { IRemainderComputationSupervisor } from "../../contracts/IRemainderComputationSupervisor.js";
import { SupervisedDecoratedRemainderDelegationServiceFactoryBeanFactory } from "../factories/SupervisedDecoratedRemainderDelegationServiceFactoryBeanFactory.js";

export class StandardRemainderModuloEvaluationStrategyImpl extends AbstractBaseModuloEvaluationStrategy {
  private static readonly STRATEGY_VERSION = "2.0.0-ENTERPRISE";
  private static readonly STRATEGY_NAME = "StandardRemainderModuloEvaluationStrategy";
  private static readonly COMPUTATION_CONTEXT = "MODULO_EVALUATION";
  private readonly remainderComputationSupervisor: IRemainderComputationSupervisor;

  constructor(
    remainderComputationSupervisor?: IRemainderComputationSupervisor,
  ) {
    super();
    this.remainderComputationSupervisor =
      remainderComputationSupervisor ??
      SupervisedDecoratedRemainderDelegationServiceFactoryBeanFactory.createSupervisedDecoratedDelegationService();
  }

  override evaluateModulo(dividend: number, divisor: number): number {
    return this.templateMethodEvaluate(dividend, divisor);
  }

  override getEvaluationStrategyName(): string {
    return StandardRemainderModuloEvaluationStrategyImpl.STRATEGY_NAME;
  }

  override getEvaluationStrategyVersion(): string {
    return StandardRemainderModuloEvaluationStrategyImpl.STRATEGY_VERSION;
  }

  override supportsDivisor(divisor: number): boolean {
    return divisor > 0 && Number.isInteger(divisor);
  }

  getRemainderComputationSupervisor(): IRemainderComputationSupervisor {
    return this.remainderComputationSupervisor;
  }

  protected override doEvaluate(
    truncatedDividend: number,
    truncatedDivisor: number,
  ): number {
    return this.remainderComputationSupervisor.superviseRemainderComputation(
      truncatedDividend,
      truncatedDivisor,
      StandardRemainderModuloEvaluationStrategyImpl.COMPUTATION_CONTEXT,
    );
  }

  protected override postProcessResult(
    result: number,
    _originalDividend: number,
    _originalDivisor: number,
  ): number {
    if (Object.is(result, -0)) {
      return 0;
    }
    return result;
  }
}
