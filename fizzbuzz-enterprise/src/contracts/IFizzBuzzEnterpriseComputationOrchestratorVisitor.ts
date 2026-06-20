import type { IFizzBuzzEvaluationContext } from "./IFizzBuzzEvaluationContext.js";

export interface IFizzBuzzEnterpriseComputationOrchestratorVisitor {
  visitOrchestrationContext(context: IFizzBuzzEvaluationContext): void;
  getVisitorType(): string;
  getVisitorPriority(): number;
  isVisitorEnabled(): boolean;
}
