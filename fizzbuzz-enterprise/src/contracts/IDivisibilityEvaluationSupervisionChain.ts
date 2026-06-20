import type { IDivisibilityEvaluationSupervisionChainLink } from "./IDivisibilityEvaluationSupervisionChainLink.js";

export interface IDivisibilityEvaluationSupervisionChain {
  evaluate(dividend: number, divisor: number): boolean;
  registerChainLink(link: IDivisibilityEvaluationSupervisionChainLink): void;
  getChainName(): string;
  getChainVersion(): string;
  getRegisteredLinkCount(): number;
}
