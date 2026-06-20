import type { IFizzBuzzEnterpriseComputationOrchestratorVisitorDispatcher } from "../contracts/IFizzBuzzEnterpriseComputationOrchestratorVisitorDispatcher.js";
import type { IFizzBuzzEnterpriseComputationOrchestratorVisitor } from "../contracts/IFizzBuzzEnterpriseComputationOrchestratorVisitor.js";
import type { IFizzBuzzEvaluationContext } from "../contracts/IFizzBuzzEvaluationContext.js";

export abstract class AbstractBaseFizzBuzzEnterpriseComputationOrchestratorVisitorDispatcher
  implements IFizzBuzzEnterpriseComputationOrchestratorVisitorDispatcher
{
  protected readonly visitors: IFizzBuzzEnterpriseComputationOrchestratorVisitor[] = [];
  protected readonly dispatcherName: string;
  protected readonly dispatcherVersion: string;

  constructor(dispatcherName: string, dispatcherVersion: string) {
    this.dispatcherName = dispatcherName;
    this.dispatcherVersion = dispatcherVersion;
  }

  abstract dispatchVisitors(context: IFizzBuzzEvaluationContext): void;

  registerVisitor(visitor: IFizzBuzzEnterpriseComputationOrchestratorVisitor): void {
    this.visitors.push(visitor);
    this.visitors.sort((a, b) => b.getVisitorPriority() - a.getVisitorPriority());
    console.debug(
      `[${this.dispatcherName}] Registered visitor: ${visitor.getVisitorType()} (priority: ${visitor.getVisitorPriority()})`,
    );
  }

  unregisterVisitor(visitorType: string): boolean {
    const index = this.visitors.findIndex((v) => v.getVisitorType() === visitorType);
    if (index !== -1) {
      this.visitors.splice(index, 1);
      console.debug(`[${this.dispatcherName}] Unregistered visitor: ${visitorType}`);
      return true;
    }
    return false;
  }

  getRegisteredVisitors(): readonly IFizzBuzzEnterpriseComputationOrchestratorVisitor[] {
    return [...this.visitors];
  }

  getDispatcherName(): string {
    return this.dispatcherName;
  }

  getDispatcherVersion(): string {
    return this.dispatcherVersion;
  }
}
