import type { IEnterpriseComputationStrategySelectionVisitor } from "../contracts/IEnterpriseComputationStrategySelectionVisitor.js";
import type { IEnterpriseComputationStrategySelectionContext } from "../contracts/IEnterpriseComputationStrategySelectionContext.js";
import type { IEnterpriseComputationStrategySelectionHandler } from "../contracts/IEnterpriseComputationStrategySelectionHandler.js";

export abstract class AbstractBaseEnterpriseComputationStrategySelectionVisitor
  implements IEnterpriseComputationStrategySelectionVisitor
{
  protected static readonly VISITOR_FRAMEWORK_VERSION = "1.0.0-VISITOR-FRAMEWORK";

  abstract getVisitorName(): string;
  abstract getVisitorVersion(): string;

  abstract visitContext(context: IEnterpriseComputationStrategySelectionContext): void;
  abstract visitHandler(handler: IEnterpriseComputationStrategySelectionHandler): void;
}
