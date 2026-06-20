import { AbstractBaseEnterpriseComputationStrategySelectionVisitor } from "../../abstracts/AbstractBaseEnterpriseComputationStrategySelectionVisitor.js";
import type { IEnterpriseComputationStrategySelectionContext } from "../../contracts/IEnterpriseComputationStrategySelectionContext.js";
import type { IEnterpriseComputationStrategySelectionHandler } from "../../contracts/IEnterpriseComputationStrategySelectionHandler.js";

export class EnterpriseComputationStrategySelectionAuditVisitorImpl
  extends AbstractBaseEnterpriseComputationStrategySelectionVisitor
{
  private static readonly VISITOR_NAME = "EnterpriseComputationStrategySelectionAuditVisitor";
  private static readonly VISITOR_VERSION = "1.0.0-AUDIT-VISITOR";

  private readonly visitedContexts: IEnterpriseComputationStrategySelectionContext[] = [];
  private readonly visitedHandlers: IEnterpriseComputationStrategySelectionHandler[] = [];

  getVisitorName(): string {
    return EnterpriseComputationStrategySelectionAuditVisitorImpl.VISITOR_NAME;
  }

  getVisitorVersion(): string {
    return EnterpriseComputationStrategySelectionAuditVisitorImpl.VISITOR_VERSION;
  }

  visitContext(context: IEnterpriseComputationStrategySelectionContext): void {
    this.visitedContexts.push(context);
    context.setContextMetadata("audit:visitedAt", Date.now());
    context.setContextMetadata("audit:visitor", this.getVisitorName());
  }

  visitHandler(handler: IEnterpriseComputationStrategySelectionHandler): void {
    this.visitedHandlers.push(handler);
  }

  getVisitedContextCount(): number {
    return this.visitedContexts.length;
  }

  getVisitedHandlerCount(): number {
    return this.visitedHandlers.length;
  }

  reset(): void {
    this.visitedContexts.length = 0;
    this.visitedHandlers.length = 0;
  }
}
