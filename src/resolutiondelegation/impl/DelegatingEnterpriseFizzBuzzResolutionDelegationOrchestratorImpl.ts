import { AbstractBaseEnterpriseFizzBuzzResolutionDelegationOrchestrator } from "../abstracts/AbstractBaseEnterpriseFizzBuzzResolutionDelegationOrchestrator.js";
import type { IEnterpriseFizzBuzzResolutionDelegationOrchestrator } from "../contracts/IEnterpriseFizzBuzzResolutionDelegationOrchestrator.js";
import type { IResolutionDelegationVisitor } from "../visitors/contracts/IResolutionDelegationVisitor.js";

const ORCHESTRATOR_NAME = "DelegatingEnterpriseFizzBuzzResolutionDelegationOrchestrator";
const ORCHESTRATOR_VERSION = "1.0.0-DELEGATION-ORCHESTRATOR";
const ORCHESTRATOR_DESCRIPTOR = "RESOLUTION_DELEGATION_MEDIATION_ORCHESTRATOR";

export class DelegatingEnterpriseFizzBuzzResolutionDelegationOrchestratorImpl
  extends AbstractBaseEnterpriseFizzBuzzResolutionDelegationOrchestrator
{
  protected readonly orchestratorName: string = ORCHESTRATOR_NAME;
  protected readonly orchestratorVersion: string = ORCHESTRATOR_VERSION;
  protected readonly orchestratorDescriptor: string = ORCHESTRATOR_DESCRIPTOR;

  constructor(visitors?: IResolutionDelegationVisitor[]) {
    super();
    if (visitors !== undefined) {
      for (const visitor of visitors) {
        this.registerVisitor(visitor);
      }
    }
    this.markInitialized();
  }

  override orchestrateDelegation(
    value: number,
    innerResolver: (value: number) => string,
  ): string {
    for (const visitor of this.visitors) {
      visitor.visitPreResolution(value, ORCHESTRATOR_NAME);
    }

    const result = innerResolver(value);

    for (const visitor of this.visitors) {
      visitor.visitPostResolution(value, result, ORCHESTRATOR_NAME);
    }

    return result;
  }

  override orchestrateRangeDelegation(
    start: number,
    end: number,
    rangeResolver: (start: number, end: number) => readonly string[],
  ): readonly string[] {
    for (const visitor of this.visitors) {
      visitor.visitPreRangeResolution(start, end, ORCHESTRATOR_NAME);
    }

    const results = rangeResolver(start, end);

    for (const visitor of this.visitors) {
      visitor.visitPostRangeResolution(start, end, results, ORCHESTRATOR_NAME);
    }

    return results;
  }
}
