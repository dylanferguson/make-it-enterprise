import type { IFizzBuzzEnterpriseComputationOrchestratorVisitor } from "../contracts/IFizzBuzzEnterpriseComputationOrchestratorVisitor.js";
import type { IFizzBuzzEvaluationContext } from "../contracts/IFizzBuzzEvaluationContext.js";

export abstract class AbstractBaseFizzBuzzEnterpriseComputationOrchestratorVisitor
  implements IFizzBuzzEnterpriseComputationOrchestratorVisitor
{
  protected readonly visitorType: string;
  protected readonly visitorPriority: number;
  protected enabled: boolean;

  constructor(visitorType: string, visitorPriority: number, enabled: boolean = true) {
    this.visitorType = visitorType;
    this.visitorPriority = visitorPriority;
    this.enabled = enabled;
  }

  abstract visitOrchestrationContext(context: IFizzBuzzEvaluationContext): void;

  getVisitorType(): string {
    return this.visitorType;
  }

  getVisitorPriority(): number {
    return this.visitorPriority;
  }

  isVisitorEnabled(): boolean {
    return this.enabled;
  }

  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
  }
}
