import { AbstractBaseDivisibilityEvaluationSupervisionChainLink } from "../../abstracts/AbstractBaseDivisibilityEvaluationSupervisionChainLink.js";

export class ModuloEvaluationSupervisionChainLinkImpl extends AbstractBaseDivisibilityEvaluationSupervisionChainLink {
  private static readonly LINK_NAME = "ModuloEvaluationSupervisionChainLink";
  private static readonly LINK_PRIORITY = 100;

  override evaluateDivisibility(dividend: number, divisor: number): boolean {
    const quotient = Math.trunc(dividend / divisor);
    const remainder = dividend - quotient * divisor;
    const isDivisible = remainder === 0;
    if (isDivisible) {
      return true;
    }
    return this.proceedToNext(dividend, divisor);
  }

  override getLinkName(): string {
    return ModuloEvaluationSupervisionChainLinkImpl.LINK_NAME;
  }

  override getLinkPriority(): number {
    return ModuloEvaluationSupervisionChainLinkImpl.LINK_PRIORITY;
  }
}
