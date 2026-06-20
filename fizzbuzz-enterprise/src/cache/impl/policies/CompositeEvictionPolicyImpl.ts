import type { ICacheEntry, ICacheEvictionPolicy } from "../../contracts/index.js";
import { AbstractBaseCacheEvictionPolicy } from "../../abstracts/index.js";

export class CompositeEvictionPolicyImpl extends AbstractBaseCacheEvictionPolicy {
  private static readonly POLICY_NAME = "CompositeEvictionPolicy";
  private static readonly POLICY_VERSION = "1.0.0-COMPOSITE-EVICTION";
  private readonly policies: readonly ICacheEvictionPolicy[];

  constructor(...policies: ICacheEvictionPolicy[]) {
    super();
    this.policies = policies;
  }

  override getPolicyName(): string { return CompositeEvictionPolicyImpl.POLICY_NAME; }
  override getPolicyVersion(): string { return CompositeEvictionPolicyImpl.POLICY_VERSION; }

  override recordAccess<T>(entry: ICacheEntry<T>): void {
    for (const policy of this.policies) policy.recordAccess(entry);
  }

  override recordInsertion<T>(entry: ICacheEntry<T>): void {
    for (const policy of this.policies) policy.recordInsertion(entry);
  }

  override shouldEvictOnAccess<T>(entry: ICacheEntry<T>): boolean {
    for (const policy of this.policies) {
      if (policy.shouldEvictOnAccess(entry)) return true;
    }
    return false;
  }

  override selectEvictionCandidate<T>(entries: readonly ICacheEntry<T>[]): ICacheEntry<T> | null {
    for (const policy of this.policies) {
      const candidate = policy.selectEvictionCandidate(entries);
      if (candidate !== null) return candidate;
    }
    return this.policies.length > 0 ? this.policies[0]!.selectEvictionCandidate(entries) : null;
  }

  override getPolicyDescriptor(): string {
    return `CompositeEvictionPolicy[policies=[${this.policies.map((p) => p.getPolicyName()).join(", ")}]]`;
  }
}
