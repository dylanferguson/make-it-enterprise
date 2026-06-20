import { AbstractBaseFizzBuzzEnterpriseComputationOrchestratorVisitorDispatcher } from "../../abstracts/AbstractBaseFizzBuzzEnterpriseComputationOrchestratorVisitorDispatcher.js";
import type { IFizzBuzzEnterpriseComputationOrchestratorVisitor } from "../../contracts/IFizzBuzzEnterpriseComputationOrchestratorVisitor.js";
import type { IFizzBuzzEvaluationContext } from "../../contracts/IFizzBuzzEvaluationContext.js";

export class FizzBuzzEnterpriseComputationOrchestratorVisitorDispatcherImpl extends AbstractBaseFizzBuzzEnterpriseComputationOrchestratorVisitorDispatcher {
  private static readonly DISPATCHER_NAME = "FizzBuzzEnterpriseComputationOrchestratorVisitorDispatcher";
  private static readonly DISPATCHER_VERSION = "2.0.0-VISITOR-DISPATCHER";
  private static readonly DISPATCH_VISITOR_PREFIX = "orchestrator:visitor:dispatch";
  private dispatchCount: number = 0;

  constructor() {
    super(
      FizzBuzzEnterpriseComputationOrchestratorVisitorDispatcherImpl.DISPATCHER_NAME,
      FizzBuzzEnterpriseComputationOrchestratorVisitorDispatcherImpl.DISPATCHER_VERSION,
    );
  }

  override dispatchVisitors(context: IFizzBuzzEvaluationContext): void {
    this.dispatchCount++;
    const enabledVisitors = this.visitors.filter((v) => v.isVisitorEnabled());
    console.debug(
      `[${this.dispatcherName}] Dispatching [${enabledVisitors.length}] enabled visitors for value [${context.getValue()}]`,
    );
    for (const visitor of enabledVisitors) {
      const visitStartTime = performance.now();
      try {
        visitor.visitOrchestrationContext(context);
      } catch (error) {
        console.error(
          `[${this.dispatcherName}] Visitor [${visitor.getVisitorType()}] failed: ${error instanceof Error ? error.message : String(error)}`,
        );
      }
      const visitDurationMs = performance.now() - visitStartTime;
      console.debug(
        `[${this.dispatcherName}] Visitor [${visitor.getVisitorType()}] completed in ${visitDurationMs.toFixed(2)}ms`,
      );
    }
  }

  getDispatchCount(): number {
    return this.dispatchCount;
  }
}
