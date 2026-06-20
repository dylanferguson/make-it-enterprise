import type { IFizzBuzzEnterpriseComputationOrchestratorVisitor } from "./IFizzBuzzEnterpriseComputationOrchestratorVisitor.js";
import type { IFizzBuzzEvaluationContext } from "./IFizzBuzzEvaluationContext.js";

export interface IFizzBuzzEnterpriseComputationOrchestratorVisitorDispatcher {
  dispatchVisitors(context: IFizzBuzzEvaluationContext): void;
  registerVisitor(visitor: IFizzBuzzEnterpriseComputationOrchestratorVisitor): void;
  unregisterVisitor(visitorType: string): boolean;
  getRegisteredVisitors(): readonly IFizzBuzzEnterpriseComputationOrchestratorVisitor[];
  getDispatcherName(): string;
  getDispatcherVersion(): string;
}
