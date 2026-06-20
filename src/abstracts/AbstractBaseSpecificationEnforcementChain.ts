import type { ISpecificationEnforcementChain } from "../contracts/ISpecificationEnforcementChain.js";
import type { ISpecificationEnforcementChainLink } from "../contracts/ISpecificationEnforcementChainLink.js";

export abstract class AbstractBaseSpecificationEnforcementChain
  implements ISpecificationEnforcementChain
{
  protected readonly links: ISpecificationEnforcementChainLink[];

  constructor() {
    this.links = [];
  }

  abstract getChainName(): string;
  abstract getChainVersion(): string;

  addChainLink(link: ISpecificationEnforcementChainLink): void {
    this.links.push(link);
  }

  enforce(value: number, divisor: number): boolean {
    if (this.links.length === 0) {
      return this.defaultEnforcement(value, divisor);
    }
    const sortedLinks = [...this.links].sort(
      (a, b) => b.getChainLinkPriority() - a.getChainLinkPriority(),
    );
    const head = sortedLinks[0]!;
    let current = head;
    for (let i = 1; i < sortedLinks.length; i++) {
      current = current.setNext(sortedLinks[i]!);
    }
    return head.enforce(value, divisor, null);
  }

  getChainLinkCount(): number {
    return this.links.length;
  }

  protected abstract defaultEnforcement(
    value: number,
    divisor: number,
  ): boolean;
}
