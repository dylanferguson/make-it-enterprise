import { AbstractBaseEnterpriseComputationStrategySelectionHandler } from "../../abstracts/AbstractBaseEnterpriseComputationStrategySelectionHandler.js";
import type { IEnterpriseComputationStrategySelectionContext } from "../../contracts/IEnterpriseComputationStrategySelectionContext.js";
import type { IFizzBuzzComputationCommand } from "../../contracts/IFizzBuzzComputationCommand.js";

export class ModuloEnterpriseComputationStrategySelectionHandlerImpl
  extends AbstractBaseEnterpriseComputationStrategySelectionHandler
{
  private static readonly HANDLER_NAME = "ModuloEnterpriseComputationStrategySelectionHandler";
  private static readonly HANDLER_PRIORITY = 100;
  private static readonly SUPPORTED_DIVISORS = [3, 5, 15];

  private readonly supportedDivisors: Set<number>;

  constructor(supportedDivisors?: number[]) {
    super();
    this.supportedDivisors = new Set(
      supportedDivisors ?? ModuloEnterpriseComputationStrategySelectionHandlerImpl.SUPPORTED_DIVISORS,
    );
  }

  canHandle(context: IEnterpriseComputationStrategySelectionContext): boolean {
    const value = context.getRequestedValue();
    return Number.isFinite(value) && value >= 0;
  }

  getHandlerName(): string {
    return ModuloEnterpriseComputationStrategySelectionHandlerImpl.HANDLER_NAME;
  }

  getHandlerPriority(): number {
    return ModuloEnterpriseComputationStrategySelectionHandlerImpl.HANDLER_PRIORITY;
  }

  protected doHandle(context: IEnterpriseComputationStrategySelectionContext): IFizzBuzzComputationCommand | null {
    const value = context.getRequestedValue();
    for (const divisor of this.supportedDivisors) {
      if (Number.isFinite(value) && value % divisor === 0) {
        context.setContextMetadata(`divisibleBy${divisor}`, true);
      }
    }
    context.setSelectedStrategyName("ModuloDivisibilityEvaluationStrategy");
    return null;
  }

  getSupportedDivisors(): readonly number[] {
    return Array.from(this.supportedDivisors);
  }
}
