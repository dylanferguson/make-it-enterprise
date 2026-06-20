import type { IEnterpriseFizzBuzzPublicApiResolutionDelegate } from "../contracts/IEnterpriseFizzBuzzPublicApiResolutionDelegate.js";

export abstract class AbstractBaseEnterpriseFizzBuzzPublicApiResolutionDelegate
  implements IEnterpriseFizzBuzzPublicApiResolutionDelegate
{
  protected abstract get delegateName(): string;
  protected abstract get delegateVersion(): string;
  protected abstract get delegateType(): string;

  private initialized: boolean = false;

  getDelegateName(): string { return this.delegateName; }
  getDelegateVersion(): string { return this.delegateVersion; }
  getDelegateType(): string { return this.delegateType; }

  abstract resolveSingleValue(value: number): string;
  abstract resolveRange(start: number, end: number): readonly string[];

  isDelegateInitialized(): boolean { return this.initialized; }

  getDelegateStatusSummary(): string {
    return `[${this.delegateName} v${this.delegateVersion}] type=${this.delegateType} initialized=${this.initialized}`;
  }

  protected markInitialized(): void {
    this.initialized = true;
  }
}
