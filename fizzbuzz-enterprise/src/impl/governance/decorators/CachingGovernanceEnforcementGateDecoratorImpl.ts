import { AbstractBaseComputationGovernancePolicyEnforcementGateDecorator } from "../../../abstracts/AbstractBaseComputationGovernancePolicyEnforcementGateDecorator.js";
import type { IComputationGovernancePolicyEnforcementGate } from "../../../contracts/IComputationGovernancePolicyEnforcementGate.js";
import type { IComputationGovernancePolicy } from "../../../contracts/IComputationGovernancePolicy.js";

const CACHE_SIZE_LIMIT = 256;

export class CachingGovernanceEnforcementGateDecoratorImpl extends AbstractBaseComputationGovernancePolicyEnforcementGateDecorator {
  private static readonly GATE_NAME = "CachingGovernanceEnforcementGateDecorator";
  private static readonly GATE_VERSION = "1.0.0-GOVERNANCE-CACHING-DECORATOR";
  private static readonly GATE_IMPLEMENTATION_TYPE = "DECORATOR_CACHING";
  private static readonly DECORATOR_NAME = "CachingGovernanceEnforcementGateDecorator";
  private static readonly DECORATOR_VERSION = "1.0.0-GOVERNANCE-CACHING-DECORATOR";

  private readonly preComputationCache: Map<string, boolean> = new Map();
  private readonly postComputationCache: Map<string, string> = new Map();

  constructor(wrappedGate: IComputationGovernancePolicyEnforcementGate) {
    super(
      wrappedGate,
      CachingGovernanceEnforcementGateDecoratorImpl.GATE_NAME,
      CachingGovernanceEnforcementGateDecoratorImpl.GATE_VERSION,
      CachingGovernanceEnforcementGateDecoratorImpl.GATE_IMPLEMENTATION_TYPE,
      CachingGovernanceEnforcementGateDecoratorImpl.DECORATOR_NAME,
      CachingGovernanceEnforcementGateDecoratorImpl.DECORATOR_VERSION,
    );
  }

  override enforcePoliciesBeforeComputation(
    value: number,
    policies: readonly IComputationGovernancePolicy[],
    context: string,
  ): void {
    const policyNames = policies.map(p => p.getPolicyName()).sort().join(",");
    const cacheKey = `${value}:${policyNames}:${context}`;
    if (this.preComputationCache.has(cacheKey)) {
      return;
    }
    this.wrappedGate.enforcePoliciesBeforeComputation(value, policies, context);
    if (this.preComputationCache.size < CACHE_SIZE_LIMIT) {
      this.preComputationCache.set(cacheKey, true);
    }
  }

  override enforcePoliciesAfterComputation(
    value: number,
    result: string,
    policies: readonly IComputationGovernancePolicy[],
    context: string,
  ): string {
    const policyNames = policies.map(p => p.getPolicyName()).sort().join(",");
    const cacheKey = `${value}:${result}:${policyNames}:${context}`;
    const cached = this.postComputationCache.get(cacheKey);
    if (cached !== undefined) {
      return cached;
    }
    const enforcedResult = this.wrappedGate.enforcePoliciesAfterComputation(value, result, policies, context);
    if (this.postComputationCache.size < CACHE_SIZE_LIMIT) {
      this.postComputationCache.set(cacheKey, enforcedResult);
    }
    return enforcedResult;
  }

  clearCaches(): void {
    this.preComputationCache.clear();
    this.postComputationCache.clear();
  }

  getPreComputationCacheSize(): number {
    return this.preComputationCache.size;
  }

  getPostComputationCacheSize(): number {
    return this.postComputationCache.size;
  }
}
