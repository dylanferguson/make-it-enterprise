import type { IEnterpriseFizzBuzzResolutionDelegationOrchestrator } from "../contracts/IEnterpriseFizzBuzzResolutionDelegationOrchestrator.js";
import type { IResolutionDelegationVisitor } from "../visitors/contracts/IResolutionDelegationVisitor.js";

export abstract class AbstractBaseEnterpriseFizzBuzzResolutionDelegationOrchestrator
  implements IEnterpriseFizzBuzzResolutionDelegationOrchestrator
{
  private initialized: boolean = false;
  protected abstract get orchestratorName(): string;
  protected abstract get orchestratorVersion(): string;
  protected abstract get orchestratorDescriptor(): string;

  protected readonly visitors: IResolutionDelegationVisitor[] = [];

  getOrchestratorName(): string { return this.orchestratorName; }
  getOrchestratorVersion(): string { return this.orchestratorVersion; }
  getOrchestratorDescriptor(): string { return this.orchestratorDescriptor; }
  isOrchestratorInitialized(): boolean { return this.initialized; }

  registerVisitor(visitor: IResolutionDelegationVisitor): void {
    this.visitors.push(visitor);
  }

  getRegisteredVisitorNames(): readonly string[] {
    return this.visitors.map((v) => v.getVisitorName());
  }

  abstract orchestrateDelegation(
    value: number,
    innerResolver: (value: number) => string,
  ): string;

  abstract orchestrateRangeDelegation(
    start: number,
    end: number,
    rangeResolver: (start: number, end: number) => readonly string[],
  ): readonly string[];

  protected markInitialized(): void { this.initialized = true; }
}
