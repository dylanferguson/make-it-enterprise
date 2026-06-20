import { AbstractBaseFizzBuzzEnterpriseComputationOrchestratorVisitor } from "../../abstracts/AbstractBaseFizzBuzzEnterpriseComputationOrchestratorVisitor.js";
import type { IFizzBuzzEnterpriseEvaluationContext } from "../../contracts/IFizzBuzzEnterpriseEvaluationContext.js";
import type { IFizzBuzzEvaluationContext } from "../../contracts/IFizzBuzzEvaluationContext.js";
import type { IFizzBuzzStrategyResolutionChainHandler } from "../../contracts/IFizzBuzzStrategyResolutionChainHandler.js";

export class ModuloDivisibilityStrategySelectionOrchestratorVisitorImpl extends AbstractBaseFizzBuzzEnterpriseComputationOrchestratorVisitor {
  private static readonly VISITOR_TYPE = "ModuloDivisibilityStrategySelectionOrchestratorVisitor";
  private static readonly VISITOR_PRIORITY = 500;
  private static readonly STRATEGY_ANNOTATION_KEY = "selectedStrategy";
  private static readonly DIVISOR_ANNOTATION_KEY = "resolvedDivisor";

  private readonly strategyResolutionChainHead: IFizzBuzzStrategyResolutionChainHandler;

  constructor(
    strategyResolutionChainHead: IFizzBuzzStrategyResolutionChainHandler,
    enabled: boolean = true,
  ) {
    super(
      ModuloDivisibilityStrategySelectionOrchestratorVisitorImpl.VISITOR_TYPE,
      ModuloDivisibilityStrategySelectionOrchestratorVisitorImpl.VISITOR_PRIORITY,
      enabled,
    );
    this.strategyResolutionChainHead = strategyResolutionChainHead;
  }

  override visitOrchestrationContext(context: IFizzBuzzEvaluationContext): void {
    const enterpriseContext = context as IFizzBuzzEnterpriseEvaluationContext;
    const value = context.getValue();
    const resolution = this.strategyResolutionChainHead.handleStrategyResolution(value);

    if (resolution.resolved) {
      enterpriseContext.setAnnotation(
        ModuloDivisibilityStrategySelectionOrchestratorVisitorImpl.STRATEGY_ANNOTATION_KEY,
        resolution.strategyType,
      );
      if (resolution.divisor !== null) {
        enterpriseContext.setAnnotation(
          ModuloDivisibilityStrategySelectionOrchestratorVisitorImpl.DIVISOR_ANNOTATION_KEY,
          String(resolution.divisor),
        );
      }
      console.debug(
        `[${this.visitorType}] Resolved strategy [${resolution.strategyType}] for value [${value}]`,
      );
    } else {
      console.debug(
        `[${this.visitorType}] No strategy resolved for value [${value}] — using default resolution`,
      );
    }
  }

  getStrategyResolutionChainHead(): IFizzBuzzStrategyResolutionChainHandler {
    return this.strategyResolutionChainHead;
  }
}
