import type { ICompositeStrategyResolutionDelegate } from "../contracts/ICompositeStrategyResolutionDelegate.js";
import type { IEnterpriseFizzBuzzCompositeStrategyTree } from "../contracts/IEnterpriseFizzBuzzCompositeStrategyTree.js";

export abstract class AbstractBaseCompositeStrategyResolutionDelegate implements ICompositeStrategyResolutionDelegate {
  protected readonly delegateName: string;
  protected readonly delegateVersion: string;
  protected compositeResolutionEnabled: boolean;

  constructor(delegateName: string, delegateVersion: string) {
    this.delegateName = delegateName;
    this.delegateVersion = delegateVersion;
    this.compositeResolutionEnabled = true;
  }

  abstract resolveWithCompositeTree(
    value: number,
    compositeTree: IEnterpriseFizzBuzzCompositeStrategyTree,
  ): string | null;

  getDelegateName(): string {
    return this.delegateName;
  }

  getDelegateVersion(): string {
    return this.delegateVersion;
  }

  isCompositeResolutionEnabled(): boolean {
    return this.compositeResolutionEnabled;
  }

  setCompositeResolutionEnabled(enabled: boolean): void {
    this.compositeResolutionEnabled = enabled;
  }
}
