import type { IDivisibilityEvaluationStrategyChainLink } from "../contracts/IDivisibilityEvaluationStrategyChainLink.js";

export abstract class AbstractBaseDivisibilityEvaluationStrategyChainLink
  implements IDivisibilityEvaluationStrategyChainLink
{
  protected static readonly DEFAULT_LINK_NAME = "AbstractBaseDivisibilityEvaluationStrategyChainLink";
  protected static readonly DEFAULT_LINK_PRIORITY = 100;

  private readonly linkName: string;
  private readonly linkPriority: number;
  private nextLink: IDivisibilityEvaluationStrategyChainLink | null = null;

  constructor(
    linkName: string = AbstractBaseDivisibilityEvaluationStrategyChainLink.DEFAULT_LINK_NAME,
    linkPriority: number = AbstractBaseDivisibilityEvaluationStrategyChainLink.DEFAULT_LINK_PRIORITY,
  ) {
    this.linkName = linkName;
    this.linkPriority = linkPriority;
  }

  setNext(link: IDivisibilityEvaluationStrategyChainLink): IDivisibilityEvaluationStrategyChainLink {
    this.nextLink = link;
    return link;
  }

  abstract evaluate(dividend: number, divisor: number): number;

  abstract canHandle(dividend: number, divisor: number): boolean;

  getLinkName(): string {
    return this.linkName;
  }

  getLinkPriority(): number {
    return this.linkPriority;
  }

  protected getNextLink(): IDivisibilityEvaluationStrategyChainLink | null {
    return this.nextLink;
  }

  protected hasNextLink(): boolean {
    return this.nextLink !== null;
  }

  protected proceedToNext(dividend: number, divisor: number): number {
    if (this.nextLink === null) {
      throw new Error(
        `[${this.linkName}] Chain terminated: no next link available to evaluate ${dividend} % ${divisor}`,
      );
    }
    return this.nextLink.evaluate(dividend, divisor);
  }

  protected assertOperandsValid(dividend: number, divisor: number): void {
    if (!Number.isFinite(dividend) || !Number.isFinite(divisor)) {
      throw new Error(
        `[${this.linkName}] Invalid operands in chain link: dividend=${dividend}, divisor=${divisor}`,
      );
    }
    if (divisor === 0) {
      throw new Error(
        `[${this.linkName}] Division by zero intercepted in chain link`,
      );
    }
  }
}
