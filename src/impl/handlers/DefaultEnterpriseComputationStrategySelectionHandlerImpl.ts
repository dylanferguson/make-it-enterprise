import { AbstractBaseEnterpriseComputationStrategySelectionHandler } from "../../abstracts/AbstractBaseEnterpriseComputationStrategySelectionHandler.js";
import type { IEnterpriseComputationStrategySelectionContext } from "../../contracts/IEnterpriseComputationStrategySelectionContext.js";
import type { IFizzBuzzComputationCommand } from "../../contracts/IFizzBuzzComputationCommand.js";

export class DefaultEnterpriseComputationStrategySelectionHandlerImpl
  extends AbstractBaseEnterpriseComputationStrategySelectionHandler
{
  private static readonly HANDLER_NAME = "DefaultEnterpriseComputationStrategySelectionHandler";
  private static readonly HANDLER_PRIORITY = -100;

  canHandle(context: IEnterpriseComputationStrategySelectionContext): boolean {
    return context.getRequestedValue() >= 0;
  }

  getHandlerName(): string {
    return DefaultEnterpriseComputationStrategySelectionHandlerImpl.HANDLER_NAME;
  }

  getHandlerPriority(): number {
    return DefaultEnterpriseComputationStrategySelectionHandlerImpl.HANDLER_PRIORITY;
  }

  protected doHandle(context: IEnterpriseComputationStrategySelectionContext): IFizzBuzzComputationCommand | null {
    context.setSelectedStrategyName("DefaultFallbackStrategy");
    return null;
  }
}
