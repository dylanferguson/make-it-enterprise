import type { IDivisibilityEvaluationStrategyChainBuilder } from "../contracts/IDivisibilityEvaluationStrategyChainBuilder.js";
import type { IDivisibilityEvaluationStrategyChainLink } from "../contracts/IDivisibilityEvaluationStrategyChainLink.js";

export abstract class AbstractBaseDivisibilityEvaluationStrategyChainBuilder
  implements IDivisibilityEvaluationStrategyChainBuilder
{
  protected static readonly DEFAULT_BUILDER_NAME = "AbstractBaseDivisibilityEvaluationStrategyChainBuilder";

  private readonly builderName: string;
  protected links: IDivisibilityEvaluationStrategyChainLink[] = [];

  constructor(builderName: string = AbstractBaseDivisibilityEvaluationStrategyChainBuilder.DEFAULT_BUILDER_NAME) {
    this.builderName = builderName;
  }

  abstract build(): IDivisibilityEvaluationStrategyChainLink;

  addLink(link: IDivisibilityEvaluationStrategyChainLink): IDivisibilityEvaluationStrategyChainBuilder {
    this.links.push(link);
    return this;
  }

  addLinkAtPosition(
    index: number,
    link: IDivisibilityEvaluationStrategyChainLink,
  ): IDivisibilityEvaluationStrategyChainBuilder {
    if (index < 0 || index > this.links.length) {
      throw new Error(
        `[${this.builderName}] Invalid link position: ${index}. Current links: ${this.links.length}`,
      );
    }
    this.links.splice(index, 0, link);
    return this;
  }

  removeLink(linkName: string): IDivisibilityEvaluationStrategyChainBuilder {
    this.links = this.links.filter(l => l.getLinkName() !== linkName);
    return this;
  }

  clearLinks(): IDivisibilityEvaluationStrategyChainBuilder {
    this.links = [];
    return this;
  }

  getConfiguredLinkCount(): number {
    return this.links.length;
  }

  getConfiguredLinks(): readonly IDivisibilityEvaluationStrategyChainLink[] {
    return [...this.links];
  }

  protected assembleChain(chainLinks: IDivisibilityEvaluationStrategyChainLink[]): IDivisibilityEvaluationStrategyChainLink {
    if (chainLinks.length === 0) {
      throw new Error(
        `[${this.builderName}] Cannot assemble chain: no links configured`,
      );
    }
    const sortedLinks = [...chainLinks].sort(
      (a, b) => a.getLinkPriority() - b.getLinkPriority(),
    );
    for (let i = 0; i < sortedLinks.length - 1; i++) {
      sortedLinks[i]!.setNext(sortedLinks[i + 1]!);
    }
    return sortedLinks[0]!;
  }
}
