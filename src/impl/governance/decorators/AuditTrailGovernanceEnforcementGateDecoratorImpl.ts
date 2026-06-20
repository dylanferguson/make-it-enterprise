import { AbstractBaseComputationGovernancePolicyEnforcementGateDecorator } from "../../../abstracts/AbstractBaseComputationGovernancePolicyEnforcementGateDecorator.js";
import type { IComputationGovernancePolicyEnforcementGate } from "../../../contracts/IComputationGovernancePolicyEnforcementGate.js";
import type { IComputationGovernancePolicy } from "../../../contracts/IComputationGovernancePolicy.js";

export class AuditTrailGovernanceEnforcementGateDecoratorImpl extends AbstractBaseComputationGovernancePolicyEnforcementGateDecorator {
  private static readonly GATE_NAME = "AuditTrailGovernanceEnforcementGateDecorator";
  private static readonly GATE_VERSION = "1.0.0-GOVERNANCE-AUDIT-DECORATOR";
  private static readonly GATE_IMPLEMENTATION_TYPE = "DECORATOR_AUDIT";
  private static readonly DECORATOR_NAME = "AuditTrailGovernanceEnforcementGateDecorator";
  private static readonly DECORATOR_VERSION = "1.0.0-GOVERNANCE-AUDIT-DECORATOR";

  private readonly auditTrail: string[] = [];
  private auditSequence: number = 0;

  constructor(wrappedGate: IComputationGovernancePolicyEnforcementGate) {
    super(
      wrappedGate,
      AuditTrailGovernanceEnforcementGateDecoratorImpl.GATE_NAME,
      AuditTrailGovernanceEnforcementGateDecoratorImpl.GATE_VERSION,
      AuditTrailGovernanceEnforcementGateDecoratorImpl.GATE_IMPLEMENTATION_TYPE,
      AuditTrailGovernanceEnforcementGateDecoratorImpl.DECORATOR_NAME,
      AuditTrailGovernanceEnforcementGateDecoratorImpl.DECORATOR_VERSION,
    );
  }

  override enforcePoliciesBeforeComputation(
    value: number,
    policies: readonly IComputationGovernancePolicy[],
    context: string,
  ): void {
    this.auditSequence++;
    const auditId = `GOV-${String(this.auditSequence).padStart(6, "0")}`;
    this.appendAuditEntry(
      `[${auditId}] PRE-CHECK: value=${value}, context=${context}, applicablePolicies=${policies.length}`,
    );
    try {
      this.wrappedGate.enforcePoliciesBeforeComputation(value, policies, context);
      this.appendAuditEntry(`[${auditId}] PRE-CHECK: PASSED for value=${value}`);
    } catch (error) {
      this.appendAuditEntry(
        `[${auditId}] PRE-CHECK: FAILED for value=${value}, error=${error instanceof Error ? error.message : String(error)}`,
      );
      throw error;
    }
  }

  override enforcePoliciesAfterComputation(
    value: number,
    result: string,
    policies: readonly IComputationGovernancePolicy[],
    context: string,
  ): string {
    const auditId = `GOV-${String(this.auditSequence).padStart(6, "0")}`;
    this.appendAuditEntry(
      `[${auditId}] POST-CHECK: value=${value}, result="${result}", context=${context}`,
    );
    try {
      const enforcedResult = this.wrappedGate.enforcePoliciesAfterComputation(value, result, policies, context);
      this.appendAuditEntry(`[${auditId}] POST-CHECK: PASSED, result="${enforcedResult}"`);
      return enforcedResult;
    } catch (error) {
      this.appendAuditEntry(
        `[${auditId}] POST-CHECK: FAILED, error=${error instanceof Error ? error.message : String(error)}`,
      );
      throw error;
    }
  }

  private appendAuditEntry(entry: string): void {
    this.auditTrail.push(entry);
    console.debug(`[${this.getDecoratorName()}] ${entry}`);
  }

  getAuditTrail(): readonly string[] {
    return [...this.auditTrail];
  }

  clearAuditTrail(): void {
    this.auditTrail.length = 0;
    this.auditSequence = 0;
  }

  getAuditSequence(): number {
    return this.auditSequence;
  }
}
