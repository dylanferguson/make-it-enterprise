import type { IDivisibilityEvaluationSupervisionChain } from "../contracts/IDivisibilityEvaluationSupervisionChain.js";
import type { IDivisibilityEvaluationSupervisionChainLink } from "../contracts/IDivisibilityEvaluationSupervisionChainLink.js";

export abstract class AbstractBaseDivisibilityEvaluationSupervisionChain
  implements IDivisibilityEvaluationSupervisionChain
{
  protected readonly chainLinks: IDivisibilityEvaluationSupervisionChainLink[] = [];
  protected readonly chainName: string;
  protected readonly chainVersion: string;

  constructor(chainName: string, chainVersion: string) {
    this.chainName = chainName;
    this.chainVersion = chainVersion;
  }

  abstract evaluate(dividend: number, divisor: number): boolean;

  registerChainLink(link: IDivisibilityEvaluationSupervisionChainLink): void {
    const index = this.chainLinks.findIndex(
      (l) => l.getLinkPriority() > link.getLinkPriority(),
    );
    if (index === -1) {
      this.chainLinks.push(link);
    } else {
      this.chainLinks.splice(index, 0, link);
    }
    this.buildLinkChain();
  }

  getChainName(): string {
    return this.chainName;
  }

  getChainVersion(): string {
    return this.chainVersion;
  }

  getRegisteredLinkCount(): number {
    return this.chainLinks.length;
  }

  protected getSortedLinks(): readonly IDivisibilityEvaluationSupervisionChainLink[] {
    return [...this.chainLinks].sort(
      (a, b) => b.getLinkPriority() - a.getLinkPriority(),
    );
  }

  protected executeLinkChain(dividend: number, divisor: number): boolean {
    const sorted = this.getSortedLinks();
    for (const link of sorted) {
      const result = link.evaluateDivisibility(dividend, divisor);
      if (result) {
        return true;
      }
    }
    return false;
  }

  private buildLinkChain(): void {
    const sorted = [...this.chainLinks].sort(
      (a, b) => b.getLinkPriority() - a.getLinkPriority(),
    );
    for (let i = 0; i < sorted.length - 1; i++) {
      const current = sorted[i];
      const next = sorted[i + 1];
      if (current !== undefined && next !== undefined) {
        current.setNext(next);
      }
    }
  }
}
