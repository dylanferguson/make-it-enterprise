import type { IEnterpriseComputationStrategySelectionHandler } from "../contracts/IEnterpriseComputationStrategySelectionHandler.js";
import type { IEnterpriseComputationStrategySelectionContext } from "../contracts/IEnterpriseComputationStrategySelectionContext.js";
import type { IFizzBuzzComputationCommand } from "../contracts/IFizzBuzzComputationCommand.js";

export abstract class AbstractBaseEnterpriseComputationStrategySelectionHandler
  implements IEnterpriseComputationStrategySelectionHandler
{
  protected nextHandler: IEnterpriseComputationStrategySelectionHandler | null = null;
  protected static readonly HANDLER_FRAMEWORK_VERSION = "1.0.0-SELECTION-HANDLER-FRAMEWORK";

  abstract getHandlerName(): string;
  abstract getHandlerPriority(): number;
  abstract canHandle(context: IEnterpriseComputationStrategySelectionContext): boolean;

  setNext(handler: IEnterpriseComputationStrategySelectionHandler): IEnterpriseComputationStrategySelectionHandler {
    this.nextHandler = handler;
    return handler;
  }

  handleStrategySelection(context: IEnterpriseComputationStrategySelectionContext): IFizzBuzzComputationCommand | null {
    if (this.canHandle(context)) {
      const command = this.doHandle(context);
      if (command !== null) {
        return command;
      }
    }
    if (this.nextHandler !== null) {
      return this.nextHandler.handleStrategySelection(context);
    }
    return null;
  }

  protected abstract doHandle(context: IEnterpriseComputationStrategySelectionContext): IFizzBuzzComputationCommand | null;

  protected getHandlerFrameworkVersion(): string {
    return AbstractBaseEnterpriseComputationStrategySelectionHandler.HANDLER_FRAMEWORK_VERSION;
  }
}
