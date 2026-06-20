import type { IDivisibilityEvaluationSupervisionChainLink } from "../contracts/IDivisibilityEvaluationSupervisionChainLink.js";

export abstract class AbstractBaseDivisibilityEvaluationSupervisionChainLink
  implements IDivisibilityEvaluationSupervisionChainLink
{
  protected nextLink: IDivisibilityEvaluationSupervisionChainLink | null = null;

  abstract evaluateDivisibility(dividend: number, divisor: number): boolean;
  abstract getLinkName(): string;
  abstract getLinkPriority(): number;

  setNext(link: IDivisibilityEvaluationSupervisionChainLink): IDivisibilityEvaluationSupervisionChainLink {
    this.nextLink = link;
    return link;
  }

  protected proceedToNext(dividend: number, divisor: number): boolean {
    if (this.nextLink !== null) {
      return this.nextLink.evaluateDivisibility(dividend, divisor);
    }
    return false;
  }
}
