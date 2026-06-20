import { AbstractBaseModuloEvaluationStrategy } from "../../abstracts/AbstractBaseModuloEvaluationStrategy.js";
import type { IRemainderOperatorDelegationService } from "../../contracts/IRemainderOperatorDelegationService.js";
import { StandardRemainderOperatorDelegationServiceImpl } from "../services/StandardRemainderOperatorDelegationServiceImpl.js";

export class StandardRemainderModuloEvaluationStrategyImpl extends AbstractBaseModuloEvaluationStrategy {
  private static readonly STRATEGY_VERSION = "1.2.0-RELEASE";
  private static readonly STRATEGY_NAME = "StandardRemainderModuloEvaluationStrategy";
  private readonly remainderOperatorDelegationService: IRemainderOperatorDelegationService;

  constructor(
    remainderOperatorDelegationService?: IRemainderOperatorDelegationService,
  ) {
    super();
    this.remainderOperatorDelegationService =
      remainderOperatorDelegationService ?? new StandardRemainderOperatorDelegationServiceImpl();
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

  protected override doEvaluate(
    truncatedDividend: number,
    truncatedDivisor: number,
  ): number {
    return this.remainderOperatorDelegationService.computeRemainder(
      truncatedDividend,
      truncatedDivisor,
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
